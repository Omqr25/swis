<?php

namespace App\Http\Repositories;

use App\Models\DonorItem;

class donorItemRepository extends baseRepository
{
    public function __construct(DonorItem $model)
    {
        parent::__construct($model);
    }

    public function index():array
    {

        $data =DonorItem::with('user','item')->paginate(10);
        if ($data->isEmpty()){
            $message="There are no donors at the moment";
        }else
        {
            $message="Donor indexed successfully";
        }
        return ['message'=>$message,"Donor"=>$data];
    }
    public function show(DonorItem $donorItem)
    {
        $data =$donorItem->with('user','item')->first();


            $message="Donor item showed successfully";

        return ['message'=>$message,"Donor"=>$data];
    }

    public function indexItemForDonor($donor_id):array
    {

        $data =DonorItem::where('user_id', $donor_id)
        ->with('user','item')->paginate(10);
        if ($data->isEmpty()){
            $message="There are no donors at the moment";
        }else
        {
            $message="Donor indexed successfully";
        }
        return ['message'=>$message,"donorItem"=>$data];
    }

    public function showItemForDonor($donor_id,$item_id)
    {
        $data =DonorItem::where('user_id', $donor_id)
            ->where('item_id',$item_id)
            ->with('user','item')->first();

            $message="Donor indexed successfully";

        return ['message'=>$message,"donorItem"=>$data];
    }
}
