<?php

namespace App\Http\Repositories;

use App\Enums\transactionType;
use App\Models\transactionWarehouseItem;
use Illuminate\Support\Facades\DB;

class transactionWarehousesItemRepository extends baseRepository
{
    public function __construct(transactionWarehouseItem $model)
    {
        parent::__construct($model);
    }

    public function index(): array
    {

        $data = transactionWarehouseItem::with('warehouse', 'item')->paginate(10);
        if ($data->isEmpty()) {
            $message = "There are no transaction in this warehouse at the moment";
        } else {
            $message = "Transaction warehouse indexed successfully";
        }
        return ['message' => $message, "TransactionWarehouseItem" => $data];
    }

    public function inventory($data)
    {
        $startDate = $data['start_date'];
        $endDate = $data['end_date'];
        // Query to get all transactions of type 'IN' for the specified warehouse and date range
        $inventoryIN = TransactionWarehouseItem::select('item_id', DB::raw('SUM(quantity) as total_quantity_in'))
            ->where('transaction_type', transactionType::transactionIn->value)
            ->where('warehouse_id',$data['warehouse_id'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereDate('created_at', $startDate)
                    ->orWhereBetween('created_at', [$startDate, $endDate]);
            })
            ->groupBy('item_id')
            ->with('item')
            ->orderby('item_id')
            ->get();
        $inventoryOut = TransactionWarehouseItem::select('item_id', DB::raw('SUM(quantity) as total_quantity_out'))
            ->where('transaction_type', transactionType::transactionOut->value)
            ->where('warehouse_id', $data['warehouse_id'])
            ->where(function ($query) use ($startDate, $endDate) {
                $query->whereDate('created_at', $startDate)
                    ->orWhereBetween('created_at', [$startDate, $endDate]);
            })
            ->groupBy('item_id')
            ->with('item')
            ->orderby('item_id')
            ->get();

        $combinedInventory = [];

        foreach ($inventoryIN as $inTransaction) {
            $combinedInventory[$inTransaction->item_id] = [
                'item_id' => $inTransaction->item_id,
                'item_name' => $inTransaction->item,
                'total_quantity_in' => $inTransaction->total_quantity_in,
                'total_quantity_out' => 0,
            ];
        }
        foreach ($inventoryOut as $outTransaction) {
            if (isset($combinedInventory[$outTransaction->item_id])) {
                $combinedInventory[$outTransaction->item_id]['total_quantity_out'] = $outTransaction->total_quantity_out;
            } else {
                $combinedInventory[$outTransaction->item_id] = [
                    'item_id' => $outTransaction->item_id,
                    'item_name' => $outTransaction->item,
                    'total_quantity_in' => 0,
                    'total_quantity_out' => $outTransaction->total_quantity_out,
                ];
            }
        }
        $combinedInventory = collect($combinedInventory)->values();
        return ($combinedInventory);

    }


}
