<?php

namespace App\Http\Controllers\Api\Admin;

use App\Exports\WarehouseExport;
use App\Exports\WarehousesExport;
use App\Http\Controllers\Controller;
use App\Http\Repositories\warehouseRepository;
use App\Http\Requests\Warehouse\StoreWarehouseRequest;
use App\Http\Requests\Warehouse\UpdateWarehouseRequest;
use App\Http\Resources\indexMainWarehouseResource;
use App\Http\Resources\indexWarehouseResource;
use App\Http\Resources\WarehouseItemResource;
use App\Http\Resources\WarehouseResource;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\showKeeperItemResource;
use App\Http\Responses\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Throwable;


class WarehouseController extends Controller
{

    private warehouseRepository $warehouseRepository;

    public function __construct(warehouseRepository $warehouseRepository)
    {
        $this->warehouseRepository=$warehouseRepository;
        $this->middleware(['auth:sanctum']);
        //$this->middleware(['permission']);
    }


    public function index(): JsonResponse
    {

            $data=$this->warehouseRepository->index();
        return $this->showAll($data['Warehouse'],indexWarehouseResource::class,$data['message']);

    }


    public function show(Warehouse $warehouse): JsonResponse
    {
            $data = $this->warehouseRepository->show($warehouse);
        return $this->showOne($data['Warehouse'],WarehouseResource::class,$data['message']);
    }


    public function store(StoreWarehouseRequest $request): JsonResponse
    {
        $WarehouseData=$request->validated();
       // dd($WarehouseData);
        if (isset($WarehouseData['location'])) {
            $location = $WarehouseData['location'];
            $WarehouseData['location'] = new Point($location['longitude'], $location['latitude']);
        }
            $data=$this->warehouseRepository->create($WarehouseData);
        return $this->showOne($data['Warehouse'],WarehouseResource::class,$data['message']);

    }



    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse): JsonResponse
    {
        $newData=$request->validated();

            $data = $this->warehouseRepository->update($newData, $warehouse);
        return $this->showOne($data['Warehouse'],WarehouseResource::class,$data['message']);

    }


    public function destroy(Warehouse $warehouse)
    {

            $data = $this->warehouseRepository->destroy($warehouse);
            return [$data['message'], $data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->warehouseRepository->showDeleted();
        return $this->showAll($data['Warehouse'],WarehouseResource::class,$data['message']);
    }

    public function restore(Request $request)
    {
        $data = $this->warehouseRepository->restore($request);
        return [$data['message'],$data['code']];
    }
    //FOR KEEPER
    public function showWarehouseForKeeper()
    {
        $data = $this->warehouseRepository->showWarehouseForKeeper(Auth::user()->id);
        return $this->showAll($data['Warehouse'],showKeeperItemResource::class,$data['message']);
    }
    //FOR ADMIN
    public function showWarehouseOfKeeper($keeper)
    {
        $data = $this->warehouseRepository->showWarehouseForKeeper($keeper);
        if($data['Warehouse'] == null) return Response::Error(null,'You are not a Keeper');
        return $this->showOne($data['Warehouse'],WarehouseItemResource::class,$data['message']);
    }
    public function indexSubWarehouse($warehouse_id): JsonResponse
    {

        $data=$this->warehouseRepository->indexSubWarehouse($warehouse_id);
        return $this->showAll($data['Warehouse'],indexWarehouseResource::class,$data['message']);

    }
    public function indexMainWarehouse(): JsonResponse
    {

        $data=$this->warehouseRepository->indexMainWarehouse();
        return $this->showAll($data['Warehouse'],indexMainWarehouseResource::class,$data['message']);

    }
    public function indexDistributionPoint():JsonResponse
    {
        $data=$this->warehouseRepository->indexDistributionPoint();
        return $this->showAll($data['Warehouse'],indexMainWarehouseResource::class,$data['message']);

    }
    public function indexWarehouseWithItems(): JsonResponse
    {

        $data = $this->warehouseRepository->indexWarehouseWithItems();
        return $this->showAll($data['Warehouse'], WarehouseItemResource::class, $data['message']);

    }


    public function showWarehouseWithItems(Warehouse $warehouse): JsonResponse
    {
//        dd($warehouse);
        $data = $this->warehouseRepository->showWarehouseWithItems($warehouse);

        return $this->showOne($data['Warehouse'], WarehouseItemResource::class, $data['message']);

    }
    public function exportAndSave()
    {
        // Define the file name and path
        $fileName = 'warehouse' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/exports/Warehouse' . $fileName;

        // Store the Excel file in the storage/app/exports directory
        Excel::store(new WarehousesExport(), $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' => route('warehouses.download', ['fileName' => $fileName])
        ]);
    }
    public function downloadFile($fileName)
    {
        $filePath = 'public/exports/Warehouse/' . $fileName;

        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        }

        return response()->json([
            'message' => 'File not found!'
        ], 404);
    }

}
