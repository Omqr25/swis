<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\driverRepository;
use App\Http\Requests\Driver\StoreDriverRequests;
use App\Http\Requests\Driver\updateDriverRequests;
use App\Http\Resources\AdminDriverResource;
use App\Http\Resources\DriverResource;
use App\Http\Responses\Response;
use App\Models\Driver;
use App\Services\driverService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;


class DriverController extends Controller
{
    private driverRepository $driverRepository ;
    public function __construct( driverRepository $driverRepository)
    {
        $this-> driverRepository =$driverRepository;
        $this->middleware(['auth:sanctum']);
//        $this->middleware(['permission:Ali']);

    }
    public function index(): JsonResponse
    {

            $data=$this->driverRepository->index();
        return $this->showAll($data['Driver'],AdminDriverResource::class,$data['message']);

    }

    public function show(Driver $driver): JsonResponse
    {

        return $this->showOne($driver,AdminDriverResource::class);

    }
    public function store(StoreDriverRequests $request): JsonResponse
    {
        $newData=$request->validated();

            $data=$this->driverRepository->create($newData);
        return $this->showOne($data['Driver'],AdminDriverResource::class,$data['message']);
    }

    public function update(updateDriverRequests $request,Driver $driver): JsonResponse
    {
        $newData=$request->validated();
        $data = $this->driverRepository->update($newData, $driver);
        return $this->showOne($data['Driver'],AdminDriverResource::class,$data['message']);

    }


    public function destroy(Driver $driver)
    {

            $data = $this->driverRepository->destroy($driver);
            return [ $data['message'], $data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->driverRepository->showDeleted();
        return $this->showAll($data['Driver'],AdminDriverResource::class,$data['message']);
    }

    public function restore(Request $request){

        $data = $this->driverRepository->restore($request);
        return [$data['message'],$data['code']];
    }

}
