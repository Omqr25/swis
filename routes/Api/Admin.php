<?php

use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\Admin\DonorItemController;
use App\Http\Controllers\Api\Admin\DriverController;
use App\Http\Controllers\Api\Admin\FileController;
use App\Http\Controllers\Api\Admin\ItemController;
use App\Http\Controllers\Api\Admin\NotificationController;
use App\Http\Controllers\Api\Admin\TransactionController;
use App\Http\Controllers\Api\Admin\TransactionWarehouseItemController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\WarehouseController;
use App\Http\Controllers\Api\Admin\WarehouseItemController;
use Illuminate\Support\Facades\Route;



Route::apiResources([
    'drivers' => DriverController::class,
    'branches' => BranchController::class,
    'warehouses' => WarehouseController::class,
    'users' => UserController::class,
    'items' => ItemController::class,
    'warehouseItems' => WarehouseItemController::class,
    'transactions' => TransactionController::class,
    'transactionWarehouseItems' => TransactionWarehouseItemController::class,
    'donorItems' => DonorItemController::class,
]);
Route::get('/files', [FileController::class, 'index']);
Route::post('/files/downloader', [FileController::class, 'downloadFile']);
Route::get('/notifications', [NotificationController::class, 'index']);

// Admin Routes
Route::controller(BranchController::class)->group(function () {
    Route::post('branches/restore', 'restore');
    Route::get('branches/showDeleted', 'showDeleted');
    Route::get('branches/indexSubBranch/{branch_id}', 'indexSubBranch');
    Route::get('branches/indexMainBranch', 'indexMainBranch');
});

Route::controller(DriverController::class)->group(function () {
    Route::post('drivers/restore', 'restore');
    Route::get('drivers/showDeleted', 'showDeleted');
});

Route::controller(ItemController::class)->group(function () {
    Route::post('items/restore', 'restore');
    Route::get('items/showDeleted', 'showDeleted');
    Route::get('items/exportBySector/{sector}', 'exportBySector');
});

Route::controller(WarehouseController::class)->group(function () {
    Route::post('warehouses/restore', 'restore');
    Route::get('warehouses/showDeleted', 'showDeleted');
    Route::get('warehouses/indexSubWarehouse/{warehouse_id}', 'indexSubWarehouse');
    Route::get('warehouses/indexMainWarehouse', 'indexMainWarehouse');
    Route::get('warehouses/indexDistributionPoint', 'indexDistributionPoint');
    Route::get('warehouses/indexWarehouseWithItems', 'indexWarehouseWithItems');
    Route::get('warehouses/showWarehouseWithItems/{warehouse}', 'showWarehouseWithItems');
    Route::get('warehouses/showWarehouseOfKeeper/{keeper}', 'showWarehouseOfKeeper');
    Route::get('warehouse/Export', 'exportAndSave');
});

Route::controller(TransactionController::class)->group(function () {
    Route::post('transactions/restore', 'restore');
    Route::get('transactions/showDeleted', 'showDeleted');
    Route::get('transactions/InDeliveryExport', 'transactionInDeliveryExport');
    Route::get('transactions/CompletedExport', 'transactionCompletedExport');

});

Route::controller(UserController::class)->group(function () {
    Route::post('users/restore', 'restore');
    Route::get('users/showDeleted', 'showDeleted');
    Route::get('users/indexKeeper', 'indexKeeper');
    Route::get('users/indexDonor', 'indexDonor');
    Route::get('users/keeperExport', 'keeperExport');
    Route::get('users/donorExport', 'donorExport');
    Route::get('users/allUsersExport', 'allUsersExport');
});

Route::controller(WarehouseItemController::class)->group(function () {
    Route::post('warehouseItems/restore', 'restore');
    Route::get('warehouseItems/showDeleted', 'showDeleted');
});

Route::controller(TransactionWarehouseItemController::class)->group(function () {
    Route::post('transactionWarehouseItems/restore', 'restore');
    Route::get('transactionWarehouseItems/showDeleted', 'showDeleted');
    Route::get('transactionWarehouseItems/inventoryForWarehouse', 'inventoryForWarehouse');
    Route::get('transactionWarehouseItems/exportInventory', 'exportInventory');
    Route::get('transactionWarehouseItems/inventoryForAllWarehouses', 'inventoryForAllWarehouses');
});

Route::controller(DonorItemController::class)->group(function () {
    Route::post('donorItems/restore', 'restore');
    Route::get('donorItems/showDeleted', 'showDeleted');
});
