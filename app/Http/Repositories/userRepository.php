<?php

namespace App\Http\Repositories;

use App\Enums\userType;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class userRepository extends baseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

   

    public function create($request):array
    {
        $request['password'] = Hash::make($request['password']);
        $data=User::create($request);
        $message="User created successfully";
        return ['message'=>$message,"User"=>$data];

    }

    public function indexKeeper(): array
    {
        $data = User::where('type', userType::keeper->value)->paginate(10);
        if ($data->isEmpty()) {
            $message = "There are no keepers at the moment";
        } else {
            $message = "Keepers indexed successfully";
        }
        return ['message' => $message, "Keeper" => $data];
    }
}