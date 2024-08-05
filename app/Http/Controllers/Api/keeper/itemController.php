<?php

namespace App\Http\Controllers\Api\keeper;

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

class itemController extends Controller
{
    private itemRepository $itemRepository;
     public function __construct( itemRepository $itemRepository){
         $this-> itemRepository =$itemRepository;
         $this->middleware(['auth:sanctum']);

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
}
