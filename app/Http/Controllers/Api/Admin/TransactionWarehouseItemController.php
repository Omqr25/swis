<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\transactionType;
use App\Http\Controllers\Controller;
use App\Http\Repositories\transactionWarehousesItemRepository;
use App\Http\Requests\inventory\inventoryRequest;
use App\Http\Requests\Transaction\storeTransactionWarehouseRequest;
use App\Http\Requests\Transaction\UpdateTransactionWarehouseRequest;
use App\Http\Resources\InventoryResource;
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
    public function inventoryForWarehouse(Request $request): JsonResponse
    {
        $request->validate([
            'warehouse_id' => 'required|integer',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        $data = [
            'warehouse_id' => $request->input('warehouse_id'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date')
        ];
        $inventory=$this->transactionWarehousesRepository->inventory($data);

        return $this->showOneCollection($inventory, InventoryResource::class);
    }

    public function inventoryForAllWarehouses(Request $request): JsonResponse
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $data = [
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $inventory = $this->transactionWarehousesRepository->inventoryForAllWarehouses($data);

        return $this->showOneCollection($inventory, InventoryResource::class);
    }


}
