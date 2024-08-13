<?php


use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);
Route::post('register', [AuthController::class, 'register']);
Route::post('complete-profile', [AuthController::class, 'completeProfile'])->name('api.complete-profile');