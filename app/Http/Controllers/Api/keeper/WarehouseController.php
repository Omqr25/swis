<?php

namespace App\Http\Controllers\Api\keeper;

use App\Http\Controllers\Controller;
use App\Http\Repositories\transactionWarehousesItemRepository;
use App\Http\Repositories\warehouseRepository;
use App\Http\Resources\InventoryResource;
use App\Http\Resources\showKeeperItemResource;
use App\Http\Resources\WarehouseResource;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class WarehouseController extends Controller
{
    private warehouseRepository $warehouseRepository;

    public function __construct(warehouseRepository $warehouseRepository,transactionWarehousesItemRepository $transactionWarehousesRepository)
    {
        $this->warehouseRepository=$warehouseRepository;
        $this->transactionWarehousesRepository=$transactionWarehousesRepository;
        $this->middleware(['auth:sanctum']);
        $this->middleware(['permission:warehouse']);
    }
    public function show()
    {
        $user = Auth::user();
        Log::info('User Roles: ', $user->getRoleNames()->toArray());
        Log::info('User Permissions: ', $user->getAllPermissions()->pluck('name')->toArray());

        $data = $this->warehouseRepository->showWarehouseForKeeper(Auth::user()->id);
        return $this->showOne($data['Warehouse'],WarehouseResource::class,$data['message']);
    }
    public function Inventory(Request $request): JsonResponse
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);
        $keeper=Warehouse::where('user_id',Auth::user()->id)->first();
        $data = [
            'warehouse_id' => $keeper->id,
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date')
        ];
        $inventory=$this->transactionWarehousesRepository->inventory($data);

        return $this->showOneCollection($inventory, InventoryResource::class);
    }
}
