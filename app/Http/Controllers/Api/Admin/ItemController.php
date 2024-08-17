<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\sectorType;
use App\Exports\ItemsExport;
use App\Http\Controllers\Controller;
use App\Http\Repositories\itemRepository;
use App\Http\Requests\Items\storeItemsRequests;
use App\Http\Requests\Items\updateItemsRequests;
use App\Http\Resources\itemsResource;
use App\Http\Responses\Response;
use App\Http\services\FilterService;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class ItemController extends Controller
{
    private itemRepository $itemRepository;
    public function __construct(itemRepository $itemRepository)
    {
        $this->itemRepository = $itemRepository;
//        $this->middleware(['auth:sanctum', 'Localization']);
//        $this->middleware(['permission:Admin']);

    }
    public function index(Request $request): JsonResponse
    {
        if ($request->has('filter') || $request->has('sort')) {
            try {
                $data = FilterService::item();
            } catch (Throwable $th) {
                return Response::Error(null, $th->getMessage());
            }
            if ($data['Item']->isEmpty()) return Response::Error(null, 'There is no such items');
            return $this->showAll($data['Item'], itemsResource::class, $data['message']);
            // return Response::Success($data, 'Items filtered successfully');
        }

        $data = $this->itemRepository->index();
        return $this->showAll($data['Item'], itemsResource::class, $data['message']);
    }

    public function show(Item $item): JsonResponse
    {

        return $this->showOne($item,itemsResource::class);

    }
    public function store(storeItemsRequests $request): JsonResponse
    {
        $dataItem=$request->validated();

            $data=$this->itemRepository->create($dataItem);
        return $this->showOne($data['Item'],itemsResource::class,$data['message']);

    }

    public function update(updateItemsRequests $request,Item $item): JsonResponse
    {
        $dataItem=$request->validated();

            $data = $this->itemRepository->update($dataItem, $item);
        return $this->showOne($data['Item'],itemsResource::class,$data['message']);

    }


    public function destroy(Item $item)
    {
            $data = $this->itemRepository->destroy($item);
        return [$data['message'],$data['code']];

    }

    public function exportBySector($sector=null)
    {
        // Validate if the provided sector exists in the enum
        if ($sector && !sectorType::tryFrom($sector)) {
            return response()->json(['message' => 'Invalid sector'], 400);
        }


        if ($sector) {
            // Filter items by the specified sector

            $items = Item::where('sectorType', $sector)->get();

            // Check if items are retrieved
            if ($items->isEmpty()) {
                return response()->json(['message' => 'No items found for the specified sector'], 404);
            }

            $fileName = 'items_' . strtolower(sectorType::tryFrom($sector)->name) . '_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        } else {
            $items = Item::all();
            $fileName = 'items_all_sectors_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        }

        $filePath = 'public/exports/items/' . $fileName;

        // Pass the data to the ItemsExport class
        $export = new ItemsExport($items);

        // Store the Excel file in the storage/app/public/items/exports directory
        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' => Storage::disk('public')->url($filePath)
        ]);
    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->itemRepository->showDeleted();
        return $this->showAll($data['Item'],itemsResource::class,$data['message']);
    }

    public function restore(Request $request){

        $data = $this->itemRepository->restore($request);
        return [$data['message'],$data['code']];
    }

}
