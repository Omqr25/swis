<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Keeper\WarehouseController ;
use App\Http\Controllers\Api\Keeper\ItemController ;
use App\Http\Controllers\Api\Keeper\TransactionController ;
use App\Http\Controllers\Api\Keeper\FileController ;


Route::get('showWarehouseForKeeper', [WarehouseController::class, 'show']);
Route::get('inventoryForKeeper', [WarehouseController::class, 'inventory']);
Route::get('exportInventory', [WarehouseController::class, 'exportInventory']);
Route::get('indexItemForKeeper', [ItemController::class, 'index']);
Route::get('showItemForKeeper/{item_id}', [ItemController::class, 'show']);
Route::get('indexTransactionForKeeper', [TransactionController::class, 'index']);
Route::get('showTransactionForKeeper/{transaction_id}', [TransactionController::class, 'show']);
Route::get('keeper/files', [FileController::class, 'index']);
