<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\transactionType;
use App\Http\Controllers\Controller;
use App\Http\Repositories\transactionWarehousesItemRepository;
use App\Http\Requests\Transaction\storeTransactionWarehouseRequest;
use App\Http\Requests\Transaction\UpdateTransactionWarehouseRequest;
use App\Http\Resources\transactionWarehouseItemResource;
use App\Http\Resources\TransactionWarehouseResource;
use App\Models\transactionWarehouseItem;
use App\Services\TransactionWarehouseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionWarehouseItemController extends Controller
{
    private transactionWarehousesItemRepository $transactionWarehousesRepository;

    public function __construct(transactionWarehousesItemRepository $transactionWarehousesRepository)
    {
        $this->transactionWarehousesRepository =$transactionWarehousesRepository;
        $this->middleware(['auth:sanctum']);
    }

    public function index(): JsonResponse
    {

        $data = $this->transactionWarehousesRepository->index();
        return $this->showAll($data['TransactionWarehouseItem'], transactionWarehouseItemResource::class, $data['message']);

    }

    public function show(transactionWarehouseItem $transactionWarehousesItem): JsonResponse
    {

        return $this->showOne($transactionWarehousesItem, transactionWarehouseItemResource::class);

    }

    public function store(storeTransactionWarehouseRequest $request): JsonResponse
    {
        $dataItem = $request->validated();

        $data = $this->transactionWarehousesRepository->create($dataItem);
        return $this->showOne($data['TransactionWarehouseItem'], transactionWarehouseItemResource::class, $data['message']);

    }

    public function update(UpdateTransactionWarehouseRequest $request, transactionWarehouseItem $transactionWarehousesItem): JsonResponse
    {
        $dataItem = $request->validated();

        $data = $this->transactionWarehousesRepository->update($dataItem, $transactionWarehousesItem);

        return $this->showOne($data['TransactionWarehouseItem'], transactionWarehouseItemResource::class, $data['message']);

    }


    public function destroy(transactionWarehouseItem $transactionWarehousesItem)
    {
        $data = $this->transactionWarehousesRepository->destroy($transactionWarehousesItem);
        return [$data['message'], $data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->transactionWarehousesRepository->showDeleted();
        return $this->showAll($data['TransactionWarehouseItem'],transactionWarehouseItemResource::class,$data['message']);
    }
    public function restore(Request $request){

        $data = $this->transactionWarehousesRepository->restore($request);
        return [$data['message'],$data['code']];
    }
    public function calculateInventory(Request $request)
    {
        // Validate the request parameters
        $request->validate([
            'warehouse_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $warehouseId = $request->input('warehouse_id');
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        // Query to get all transactions of type 'IN' for the specified warehouse and date range
        $inventory = TransactionWarehouseItem::select('item_id', DB::raw('SUM(quantity) as total_quantity'))
            ->where('transaction_type', transactionType::transactionIn)
            ->where('warehouse_id', $warehouseId)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('item_id')
            ->with('item')
            ->get();

        // Format the results
        $results = $inventory->map(function($transaction) {
            return [
                'item_id' => $transaction->item_id,
                'item_name' => $transaction->item->name,
                'total_quantity' => $transaction->total_quantity,
            ];
        });

        return response()->json($results);
    }

}
