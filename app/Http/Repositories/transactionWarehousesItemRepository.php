<?php

namespace App\Http\Repositories;

use App\Enums\transactionType;
use App\Models\transactionWarehouseItem;
use App\Models\WarehouseItem;
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
        $warehouseId = $data['warehouse_id'];
        $startDate = $data['start_date'];
        $endDate = $data['end_date'];

        $inventory = TransactionWarehouseItem::select(
            'transaction_warehouse_items.item_id',
            DB::raw('SUM(CASE WHEN transactions.transaction_type = '.transactionType::transactionIn->value.' THEN transaction_warehouse_items.quantity ELSE 0 END) as total_quantity_in'),
            DB::raw('SUM(CASE WHEN transactions.transaction_type = '.transactionType::transactionOut->value.' THEN transaction_warehouse_items.quantity ELSE 0 END) as total_quantity_out')
        )
            ->join('transactions', 'transactions.id', '=', 'transaction_warehouse_items.transaction_id')
            ->where('transaction_warehouse_items.warehouse_id', $warehouseId)
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->groupBy('transaction_warehouse_items.item_id')
            ->with('item')
            ->get();

        if ($inventory->isEmpty()) {
            // Return an empty collection or handle as needed
            return collect([]);
        }

        // Process the inventory data
        $warehouseItems = WarehouseItem::select('item_id', 'quantity')
            ->where('warehouse_id', $warehouseId)
            ->get()
            ->keyBy('item_id');

        $mergedInventory = $inventory->map(function ($item) use ($warehouseItems) {
            $itemQuantityInWarehouse = $warehouseItems->has($item->item_id) ? $warehouseItems[$item->item_id]->quantity : 0;
            return [
                'item_id' => $item->item_id,
                'item_name' => $item->item->name,
                'total_quantity_in' => (string)$item->total_quantity_in,
                'total_quantity_out' => (string)$item->total_quantity_out,
                'quantity_in_warehouse' => (string)$itemQuantityInWarehouse,
            ];
        });

        return $mergedInventory;
    }




    public function inventoryForAllWarehouses($data)
    {
        $startDate = $data['start_date'];
        $endDate = $data['end_date'];

        // Query to get the total quantities across all warehouses for each item
        $inventory = TransactionWarehouseItem::select(
            'transaction_warehouse_items.item_id',
            DB::raw('SUM(CASE WHEN transactions.transaction_type = ' . transactionType::transactionIn->value . ' THEN transaction_warehouse_items.quantity ELSE 0 END) as total_quantity_in'),
            DB::raw('SUM(CASE WHEN transactions.transaction_type = ' . transactionType::transactionOut->value . ' THEN transaction_warehouse_items.quantity ELSE 0 END) as total_quantity_out')
        )
            ->join('transactions', 'transactions.id', '=', 'transaction_warehouse_items.transaction_id')
            ->whereBetween('transactions.created_at', [$startDate, $endDate])
            ->groupBy('transaction_warehouse_items.item_id')
            ->orderBy('transaction_warehouse_items.item_id')  // Sorting by item_id
            ->with('item')
            ->get();

        // Get the current total quantity of each item across all warehouses
        $warehouseItems = WarehouseItem::select('item_id', DB::raw('SUM(quantity) as quantity_in_warehouse'))
            ->groupBy('item_id')
            ->get()
            ->keyBy('item_id');

        // Merge the inventory data with the current quantities
        $mergedInventory = $inventory->map(function ($item) use ($warehouseItems) {
            $itemQuantityInWarehouse = $warehouseItems->has($item->item_id) ? $warehouseItems[$item->item_id]->quantity_in_warehouse : 0;
            return [
                'item_id' => $item->item_id,
                'item_name' => $item->item->name,
                'total_quantity_in' => (string)$item->total_quantity_in,
                'total_quantity_out' => (string)$item->total_quantity_out,
                'quantity_in_warehouse' => (string)$itemQuantityInWarehouse,
            ];
        });

        return $mergedInventory;
    }





}
