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

        // Query to get all transactions of type 'IN' and 'OUT' for the specified warehouse and date range
        $inventory = TransactionWarehouseItem::select(
            'item_id',
            DB::raw('SUM(CASE WHEN transaction_type = '.transactionType::transactionIn->value.' THEN quantity ELSE 0 END) as total_quantity_in'),
            DB::raw('SUM(CASE WHEN transaction_type = '.transactionType::transactionOut->value.' THEN quantity ELSE 0 END) as total_quantity_out')
        )
            ->where('warehouse_id', $warehouseId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('item_id')
            ->with('item')
            ->get();

        // Get the current quantity of each item in the warehouse
        $warehouseItems = WarehouseItem::select('item_id', 'quantity')
            ->where('warehouse_id', $warehouseId)
            ->get()
            ->keyBy('item_id');

        // Merge the inventory data with the warehouse quantities
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
            'item_id',
            DB::raw('SUM(CASE WHEN transaction_type = '.transactionType::transactionIn->value.' THEN quantity ELSE 0 END) as total_quantity_in'),
            DB::raw('SUM(CASE WHEN transaction_type = '.transactionType::transactionOut->value.' THEN quantity ELSE 0 END) as total_quantity_out')
        )
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('item_id')
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
