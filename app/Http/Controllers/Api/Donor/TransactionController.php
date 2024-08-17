<?php

namespace App\Http\Controllers\Api\Donor;

use App\Http\Controllers\Controller;
use App\Http\Repositories\transactionRepository;
use App\Http\Resources\DonorTransactionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    private transactionRepository $transactionRepository;
    public function __construct(transactionRepository $transactionRepository){
        $this->transactionRepository=$transactionRepository;
        $this->middleware(['auth:sanctum', 'Localization']);
//        $this->middleware(['permission:Donor']);
    }
    public function index()
    {
        $data = $this->transactionRepository->indexTransactionForDonor(Auth::user()->id);
        return $this->showAll($data['Transaction'],DonorTransactionResource::class,$data['message']);
    }
    public function show($transaction_id)
    {
        $data = $this->transactionRepository->showTransactionForDonor(Auth::user()->id,$transaction_id);
        return $this->showOne($data['Transaction'],DonorTransactionResource::class,$data['message']);
    }

}
