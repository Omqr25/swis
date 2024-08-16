<?php

use App\Http\Controllers\Api\Donor\TransactionController ;
use App\Http\Controllers\Api\Donor\DonorItemController ;
use Illuminate\Support\Facades\Route;

Route::get('indexTransactionForDonor', [TransactionController::class, 'index']);
Route::get('showTransactionForDonor/{transaction_id}', [TransactionController::class, 'show']);
Route::get('indexItemForDonor', [DonorItemController::class, 'index']);
Route::get('showItemForDonor/{item_id}', [DonorItemController::class, 'show']);
