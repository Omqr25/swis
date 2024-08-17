<?php

namespace App\Http\Controllers\Api\keeper;

use App\Exports\ItemsExport;
use App\Http\Controllers\Controller;
use App\Http\Repositories\itemRepository;
use App\Http\Resources\ItemInWarehouseResource;
use App\Http\Resources\itemsResource;
use App\Http\Resources\indexKeeperItemResource;
use App\Http\Resources\showKeeperItemResource;
use App\Models\Item;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class ItemController extends Controller
{
    private ItemRepository $itemRepository;
     public function __construct( ItemRepository $itemRepository){
         $this-> itemRepository =$itemRepository;
         $this->middleware(['auth:sanctum', 'Localization']);
//         $this->middleware(['permission:Keeper']);


     }
    public function index(): JsonResponse
    {
        $data=$this->itemRepository->indexItemForKeeper(Auth::user()->id);
        return $this->showAll($data['Item'],indexKeeperItemResource::class,$data['message']);
    }
    public function show($item_id): JsonResponse
    {        $keeper=Warehouse::where('user_id',Auth::user()->id)->first();

        $data=$this->itemRepository->showItemForKeeper($item_id,$keeper->id);
        return $this->showOne($data['WarehouseItem'],showKeeperItemResource::class,$data['message']);

    }
    public function itemExport()
    {
        // Define the file name and path
        $fileName = 'keeper_item_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/keeper/exports/users/' . $fileName;

        $data =Warehouse::where('user_id',Auth::user()->id)
            ->with('WarehouseItem.item')->get();

        $export = new ItemsExport($data);

        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' =>  Storage::disk('public')->url($filePath)
        ]);
    }
}
