<?php

namespace App\Http\Repositories;

use App\Enums\userType;
use App\Mail\NewUserCredentials;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class userRepository extends baseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }



    public function create($request): array
    {
        // Generate a random password
        $password = Str::random(10);

        // Extract the user type and other details from the request
        $userType = UserType::from($request['type']); // Assume `user_type` is provided in the request
        $randomNumber = rand(1000, 9999); // Generate a random number
        $username = $request['name']['en'] ?? reset($request['name']);

        // Determine the email address based on user type
        switch ($userType) {
            case UserType::keeper:
                $email = "{$username}{$randomNumber}@keeper.swis.com";
                break;
            case UserType::donor:
                $email = "{$username}{$randomNumber}@donor.swis.com";
                break;
            case UserType::admin:
                $email = "{$username}{$randomNumber}@admin.swis.com";
                break;
            default:
                // Handle invalid user type
                return ['message' => 'Invalid user type'];
        }

        // Update request with the new email and hashed password
        $request['email'] = $email;
        $request['password'] = Hash::make($password);

        // Create the user
        $data = User::create($request);

        // Prepare email details
        $message = "User created successfully";
        $details = [
            'email' => $email,
            'password' => $password,
        ];

        // Send email to the generated email address
        Mail::to($data->contact_email)->send(new NewUserCredentials($details));

        return ['message' => $message, 'User' => $data];
    }
    public function indexDonor():array
    {
        $data =User::where('type',userType::donor->value)->paginate(10);
        if ($data->isEmpty()){
            $message="There are no donors at the moment";
        }else
        {
            $message="Donor indexed successfully";
        }
        return ['message'=>$message,"Donor"=>$data];
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
