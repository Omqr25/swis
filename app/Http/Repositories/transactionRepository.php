<?php

namespace App\Http\Repositories;

use App\Exceptions\InvalidQuantitiesException;
use App\Http\Requests\Donor\storeDonorItemRequest;
use App\Http\Responses\Response;
use App\Models\Donor;
use App\Models\donorItem;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\transactionDriver;
use App\Models\transactionWarehouseItem;
use App\Models\User;
use App\Models\Warehouse;
use App\Models\WarehouseItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class transactionRepository extends baseRepository
{
    public function __construct(Transaction $model)
    {
        parent::__construct($model);
    }
    public function index():array
    {

        $data =Transaction::with(['user','transactionWarehouseItem.warehouse','transactionWarehouseItem.item'])
            ->paginate(10);
        if ($data->isEmpty()){
            $message="There are no Transaction at the moment";
        }else
        {
            $message="Transaction indexed successfully";
        }
        return ['message'=>$message,"Transaction"=>$data];
    }
    public function create( $dataItem): array
    {
        $transaction=Transaction::create([
            'user_id' => Auth::id(),
            'is_convoy' => $dataItem['is_convoy'],
            'notes' => $dataItem['notes'] ?? null,
            'waybill_num' => $dataItem['waybill_num'],
            'waybill_img' => $dataItem['waybill_img'],
            'status' => $dataItem['status'],
            'date' => $dataItem['date'],
            'transaction_type' => $dataItem['transaction_type'],
            'transaction_mode_type' => $dataItem['type'],
            'CTN' => $dataItem['CTN'] ?? null,
            'qr_code' => $dataItem['qr_code'] ?? null,]);

        if (isset($dataItem['items']) && is_array($dataItem['items'])) {
            foreach ($dataItem['items'] as $itemData) {
                $transactionItem = TransactionWarehouseItem::create([
                    'transaction_id' => $transaction->id,
                    'warehouse_id' => $itemData['warehouse_id'],
                    'item_id' => $itemData['item_id'],
                    'quantity' => $itemData['quantity'],
                ]);
            }
        }

        if (isset($dataItem['drivers']) && is_array($dataItem['drivers'])) {
            foreach ($dataItem['drivers'] as $driver) {
                TransactionDriver::create([
                    'transaction_id' => $transaction->id,
                    'driver_id' => $driver['driver_id'],
                ]);
            }
        }
        $message="Transactions created successfully";
        return ['message'=>$message,"Transaction"=>$transaction];
    }
//    public function update($transactionId, $dataItem): array
//    {
//        $transaction = Transaction::find($transactionId);
//
//        if (!$transaction) {
//            $message = "Transaction not found with ID: {$transactionId}";
//            return ['message' => $message];
//        }
//
//        $transaction->update([
//            'user_id' => Auth::id(),
//            'is_convoy' => $dataItem['is_convoy'],
//            'notes' => $dataItem['notes'] ?? null,
//            'Waybill_num' => $dataItem['waybill_num'],
//            'waybill_img' => $dataItem['waybill_img'],
//            'status' => $dataItem['status'],
//            'date' => $dataItem['date'],
//            'CTN' => $dataItem['CTN'] ?? null,
//            'qr_code' => $dataItem['qr_code'] ?? null,
//        ]);
//
//        // Update items
//        if (isset($dataItem['items']) && is_array($dataItem['items'])) {
//            // Delete existing items related to this transaction
//            TransactionWarehouseItem::where('transaction_id', $transactionId)->delete();
//
//            // Insert updated items
//            foreach ($dataItem['items'] as $itemData) {
//                TransactionWarehouseItem::create([
//                    'transaction_id' => $transaction->id,
//                    'warehouse_id' => $itemData['warehouse_id'],
//                    'item_id' => $itemData['item_id'],
//                    'quantity' => $itemData['quantity'],
//                    'transaction_type' => $itemData['transaction_type'],
//                    'transaction_mode_type' => $itemData['type'],
//                ]);
//            }
//        }
//
//        // Update drivers (if applicable)
//        if (isset($dataItem['drivers']) && is_array($dataItem['drivers'])) {
//            // Delete existing drivers related to this transaction
//            TransactionDriver::where('transaction_id', $transactionId)->delete();
//
//            // Insert updated drivers
//            foreach ($dataItem['drivers'] as $driverId) {
//                TransactionDriver::create([
//                    'transaction_id' => $transaction->id,
//                    'driver_id' => $driverId,
//                ]);
//            }
//        }
//
//        $message = "Transaction updated successfully";
//        return ['message' => $message, "transaction" => $transaction];
//    }


    public function indexTransactionForKeeper($user_id)
    {
        $data = Warehouse::where('user_id',$user_id)
            ->with('transactionWarehouseItem.transaction')
            ->paginate(10);
        if ($data->isEmpty()){
            $message="There are no transactions at the moment";
        }
        else
        {
            $message="Transactions indexed successfully";
        }
        return ['message'=>$message,"Transaction"=>$data];
    }

    public function showTransactionForKeeper($transaction_id){

        $data = Transaction::where('id', $transaction_id)
            ->with('transactionWarehouseItem.item',
                'transactionWarehouseItem.warehouse',
                'user','driverTransaction.driver')
            ->first();
//        return $data;

            $message="Transaction showed successfully";

        return ['message'=>$message,"Transaction"=>$data];
    }

    public function indexTransactionForDonor($donor_id){
        $data = Transaction::where('user_id',$donor_id)
            ->with('transactionWarehouseItem.item','driverTransaction.driver')
            ->paginate(10);
        if ($data->isEmpty()){
            $message="There are no transactions at the moment";
        }
        else
        {
            $message="Transactions indexed successfully";
        }
        return ['message'=>$message,"Transaction"=>$data];
    }

    public function showTransactionForDonor($donor_id,$transactuon_id){
        $data = Transaction::where('user_id',$donor_id)
            ->where('id',$transactuon_id)
            ->with('transactionWarehouseItem.item','driverTransaction.driver')
            ->first();

            $message="Transactions indexed successfully";

        return ['message'=>$message,"Transaction"=>$data];
    }


    public function UpdateSystemItemsQuantity($transaction)
    {
        $user = User::find(Auth::id());
        if ($user->type->value == 2) {
            return;
        }
        $updatedQuantities = [];
        $invalidQuantities = [];

        if ($transaction['transaction_type'] == 1) {
            foreach ($transaction['items'] as $item_in_transaction) {
                $item = Item::find($item_in_transaction['item_id']);
                $updatedQuantities[$item->id] = $item->quantity + $item_in_transaction['quantity'];
            }
        } else if ($transaction['transaction_type'] == 2) {
            foreach ($transaction['items'] as $item_in_transaction) {
                $item = Item::find($item_in_transaction['item_id']);
                if ($item_in_transaction['quantity'] > $item->quantity) {
                    $invalidQuantities[$item->id] = $item_in_transaction['quantity'];
                } else {
                    $updatedQuantities[$item->id] = max(0, $item->quantity - $item_in_transaction['quantity']);
                }
            }
        }


        if (!empty($invalidQuantities)) {
            throw new InvalidQuantitiesException($invalidQuantities);
        }

        DB::transaction(function () use ($updatedQuantities) {
            foreach ($updatedQuantities as $itemId => $newQuantity) {
                Item::where('id', $itemId)->update(['quantity' => $newQuantity]);
            }
        });
    }

    public function UpdateWarehouseItemsQuantity($transaction){

        $keeper = Warehouse::where('user_id', Auth::user()->id)->first();
        if ($keeper == null) {
            $i = 0;
            $updatedQuantities = [];
            $invalidQuantities = [];
            if ($transaction['transaction_type'] == 1) {
                foreach ($transaction['items'] as $item_in_transaction) {
                    $item_in_warehouse = WarehouseItem::where('warehouse_id', $item_in_transaction['warehouse_id'])
                    ->where('item_id', $item_in_transaction['item_id'])
                    ->first();
                    if ($item_in_warehouse != null) {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $item_in_warehouse->warehouse_id,
                            'item_id' => $item_in_warehouse->item_id,
                            'quantity' => $item_in_warehouse->quantity + $item_in_transaction['quantity'],
                        ];
                    } else {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $item_in_transaction['warehouse_id'],
                            'item_id' => $item_in_transaction['item_id'],
                            'quantity' => $item_in_transaction['quantity'],
                        ];
                    }
                }
            } else if ($transaction['transaction_type'] == 2) {
                foreach ($transaction['items'] as $item_in_transaction) {
                    $item_in_warehouse = WarehouseItem::where('warehouse_id', $item_in_transaction['warehouse_id'])
                    ->where('item_id', $item_in_transaction['item_id'])
                    ->first();
                    if ($item_in_warehouse == null) {
                        $invalidQuantities[$item_in_transaction['item_id']] = $item_in_transaction['quantity'];
                    } else {
                        if ($item_in_transaction['quantity'] > $item_in_warehouse->quantity) {
                            $invalidQuantities[$item_in_warehouse->item_id] = $item_in_transaction['quantity'];
                        } else {
                            $updatedQuantities[$i++] = [
                                'warehouse_id' => $item_in_warehouse->warehouse_id,
                                'item_id' => $item_in_warehouse->item_id,
                                'quantity' => max(0, $item_in_warehouse->quantity - $item_in_transaction['quantity']),
                            ];
                        }
                    }
                }
            }



            if (!empty($invalidQuantities)) {
                $message = 'The warehouse has insufficient quantity of the following items :';
                throw new InvalidQuantitiesException($invalidQuantities, $message);
            }

            foreach ($updatedQuantities as $updatedQuantity) {
                $warehouseId = $updatedQuantity['warehouse_id'];
                $itemId = $updatedQuantity['item_id'];
                $quantity = $updatedQuantity['quantity'];

                $existingRecord = WarehouseItem::firstOrNew([
                    'warehouse_id' => $warehouseId,
                    'item_id' => $itemId,
                ]);

                $existingRecord->quantity = $quantity;
                $existingRecord->save();
            }
        } else if ($keeper != null) {
            $i = 0;
            $updatedQuantities = [];
            $invalidQuantities = [];
            if ($transaction['transaction_type'] == 1) {
                foreach ($transaction['items'] as $item_in_transaction) {
                    $source = WarehouseItem::where('warehouse_id', $keeper->id)
                        ->where('item_id', $item_in_transaction['item_id'])
                        ->first();
                    $destination = WarehouseItem::where('warehouse_id', $item_in_transaction['warehouse_id'])
                    ->where('item_id', $item_in_transaction['item_id'])
                    ->first();
                    if ($source == null) {
                        $invalidQuantities[$item_in_transaction['item_id']] = $item_in_transaction['quantity'];
                    } else {
                        if ($item_in_transaction['quantity'] > $source->quantity) {
                            $invalidQuantities[$source->item_id] = $item_in_transaction['quantity'];
                        } else {
                            $updatedQuantities[$i++] = [
                                'warehouse_id' => $source->warehouse_id,
                                'item_id' => $source->item_id,
                                'quantity' => max(0, $source->quantity - $item_in_transaction['quantity']),
                            ];
                        }
                    }
                    if ($destination != null) {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $destination->warehouse_id,
                            'item_id' => $destination->item_id,
                            'quantity' => $destination->quantity + $item_in_transaction['quantity'],
                        ];
                    } else {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $item_in_transaction['warehouse_id'],
                            'item_id' => $item_in_transaction['item_id'],
                            'quantity' => $item_in_transaction['quantity'],
                        ];
                    }
                }
            } else if ($transaction['transaction_type'] == 2) {
                foreach ($transaction['items'] as $item_in_transaction) {
                    $source = WarehouseItem::where('warehouse_id', $keeper->id)
                        ->where('item_id', $item_in_transaction['item_id'])
                        ->first();
                    $destination = WarehouseItem::where('warehouse_id', $item_in_transaction['warehouse_id'])
                    ->where('item_id', $item_in_transaction['item_id'])
                    ->first();
                    if ($destination == null) {
                        $invalidQuantities[$item_in_transaction['item_id']] = $item_in_transaction['quantity'];
                    } else {
                        if ($item_in_transaction['quantity'] > $destination->quantity) {
                            $invalidQuantities[$destination->item_id] = $item_in_transaction['quantity'];
                        } else {
                            $updatedQuantities[$i++] = [
                                'warehouse_id' => $destination->warehouse_id,
                                'item_id' => $destination->item_id,
                                'quantity' => max(0, $destination->quantity - $item_in_transaction['quantity']),
                            ];
                        }
                    }
                    if ($source != null) {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $source->warehouse_id,
                            'item_id' => $source->item_id,
                            'quantity' => $source->quantity + $item_in_transaction['quantity'],
                        ];
                    } else {
                        $updatedQuantities[$i++] = [
                            'warehouse_id' => $keeper->id,
                            'item_id' => $item_in_transaction['item_id'],
                            'quantity' => $item_in_transaction['quantity'],
                        ];
                    }
                }
            }

            if (!empty($invalidQuantities)) {
                throw new InvalidQuantitiesException($invalidQuantities);
            }

            foreach ($updatedQuantities as $updatedQuantity) {
                $warehouseId = $updatedQuantity['warehouse_id'];
                $itemId = $updatedQuantity['item_id'];
                $quantity = $updatedQuantity['quantity'];

                $existingRecord = WarehouseItem::firstOrNew([
                    'warehouse_id' => $warehouseId,
                    'item_id' => $itemId,
                ]);

                $existingRecord->quantity = $quantity;
                $existingRecord->save();
            }
        }
    }

    public function UpdateDonorItemsQuantity($transaction)
    {
        $keeper = Warehouse::where('user_id', Auth::id())->get();
        if ($keeper->isNotEmpty()) {
            return;
        }

        if ($transaction['transaction_type'] == 1) {
            foreach ($transaction['items'] as $donated_item) {
                $donorItem = donorItem::where('user_id', Auth::id())
                    ->where('item_id', $donated_item['item_id'])
                    ->first();

                if ($donorItem != null) {
                    $donorItem->quantity += $donated_item['quantity'];
                    $donorItem->save();
                } else {
                    donorItem::create([
                        'user_id' => Auth::id(),
                        'item_id' => $donated_item['item_id'],
                        'quantity' => $donated_item['quantity'],
                    ]);
                }
            }
        }
    }
}
