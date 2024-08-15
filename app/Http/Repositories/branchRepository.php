<?php

namespace App\Http\Repositories;

use App\Models\Branch;
use Illuminate\Support\Collection;

class branchRepository extends baseRepository
{
    public function __construct(Branch $model)
    {
        parent::__construct($model);
    }
    public function index()
    {
        $data = Branch::with('parentBranch')->paginate(10);
        if ($data->isEmpty()){
            $message="There are no branch at the moment";
        }else
        {
            $message="Branch indexed successfully";
        }
        return ['message'=>$message,"Branch"=>$data];

    }

    public function indexSubBranch($branch):array
    {
        $data =Branch::where('parent_id',$branch)
        ->with('parentBranch')->paginate(10);
        if ($data->isEmpty()){
            $message="There are no sub branch at the moment";
        }else
        {
            $message="Sub branch indexed successfully";
        }
        return ['message'=>$message,"Branch"=>$data];
    }
    public function indexMainBranch():array
    {
        $data =Branch::where('parent_id',null)
       ->paginate(10);
        if ($data->isEmpty()){
            $message="There are no main branch at the moment";
        }else
        {
            $message="main branch indexed successfully";
        }
        return ['message'=>$message,"Branch"=>$data];
    }
}