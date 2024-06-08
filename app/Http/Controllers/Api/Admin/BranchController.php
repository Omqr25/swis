<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Repositories\baseRepository;
use App\Http\Repositories\branchRepository;
use App\Http\Requests\Branch\StoreBranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use App\Http\Resources\BranchResource;
use App\Models\Branch;
use Illuminate\Http\Request;
use App\Http\Responses\Response;
use Illuminate\Http\JsonResponse;
use Throwable;


class BranchController extends Controller
{
    private branchRepository $branchRepository;

    public function __construct(branchRepository $branchRepository)
    {
        $this->branchRepository =$branchRepository;
        $this->middleware(['auth:sanctum']);
    }
    public function index(): JsonResponse
    {

            $data=$this->branchRepository->index();
        return $this->showAll($data['Branch'],BranchResource::class,$data['message']);

    }

    public function show(Branch $branch): JsonResponse
    {

        return $this->showOne($branch,BranchResource::class);


    }


    public function store(StoreBranchRequest $request): JsonResponse
    {
        $newData=$request->validated();

            $data=$this->branchRepository->create($newData);
        return $this->showOne($data['Branch'],BranchResource::class,$data['message']);

    }


    public function update(UpdateBranchRequest $request, Branch $branch): JsonResponse
    {
        $newData=$request->validated();

            $data = $this->branchRepository->update($newData, $branch);
        return $this->showOne($data['Branch'],BranchResource::class,$data['message']);

    }


    public function destroy(Branch $branch)
    {

            $data = $this->branchRepository->destroy($branch);
        return [$data['message'],$data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->branchRepository->showDeleted();
        return $this->showAll($data['Branch'],BranchResource::class,$data['message']);
    }
    public function restore(Request $request){

        $data = $this->branchRepository->restore($request);
        return [$data['message'],$data['code']];
    }
}
