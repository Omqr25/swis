<?php

use App\Http\Controllers\Api\Admin\DonorController;
use App\Http\Controllers\Api\Admin\DonorItemController;
use App\Http\Controllers\Api\Admin\DriverController;
use App\Http\Controllers\Api\Admin\FileController;
use App\Http\Controllers\Api\Admin\ItemController;
use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\Admin\WarehouseItemController;
use App\Http\Controllers\Api\Admin\TransactionController;
use App\Http\Controllers\Api\Admin\TransactionWarehouseItemController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\WarehouseController;
use App\Http\Controllers\Api\Keeper\WarehouseController as KeeperWarehouseController;
use App\Http\Controllers\Api\Keeper\ItemController as KeeperItemController;
use App\Http\Controllers\Api\Keeper\TransactionController as KeeperTransactionController;
use App\Http\Controllers\Api\Donor\TransactionController as DonorTransactionController;
use App\Http\Controllers\Api\Donor\DonorItemController as DonorItemForDonorController;
use App\Http\Controllers\Api\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

require_once __DIR__ . '/Api/Auth.php';

Route::middleware(['auth:sanctum', 'Localization'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('Localization')->group(function () {

    Route::controller(SearchController::class)->group(function () {
        Route::get('search/searchitems', 'searchItems')->name('items.search');
        Route::get('search/searchdrivers', 'searchDrivers')->name('drivers.search');
        Route::get('search/searchtransactions', 'searchTransactions')->name('transactions.search');
        Route::get('search/searchwarehouses', 'searchWarehouses')->name('warehouses.search');
        Route::get('search/searchbranches', 'searchBranches')->name('branches.search');
        Route::get('search/searchusers', 'searchUsers')->name('users.search');
    });

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

//    Route::controller(DonorController::class)->group(function () {
//        Route::post('donors/restore', 'restore');
//        Route::get('donors/showDeleted', 'showDeleted');
//    });

    Route::controller(ItemController::class)->group(function () {
        Route::post('items/restore', 'restore');
        Route::get('items/showDeleted', 'showDeleted');
        Route::get('items/exportBySector/{sector}', 'exportBySector');
        Route::get('items/download/{fileName}', 'downloadFile')->name('items.download');
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
        Route::get('warehouses/export', 'exportAndSave');
        Route::get('warehouses/download/{fileName}', 'downloadFile')->name('warehouses.download');
    });

    Route::controller(TransactionController::class)->group(function () {
        Route::post('transactions/restore', 'restore');
        Route::get('transactions/showDeleted', 'showDeleted');
    });

    Route::controller(UserController::class)->group(function () {
        Route::post('users/restore', 'restore');
        Route::get('users/showDeleted', 'showDeleted');
        Route::get('users/indexKeeper', 'indexKeeper');
        Route::get('users/indexDonor', 'indexDonor');
        Route::get('users/keeperExport', 'keeperExport');
        Route::get('users/donorExport', 'donorExport');
        Route::get('users/download/{fileName}', 'downloadFile')->name('users.download');
        Route::get('/users/export-pdf', 'exportPdf')->name('users.export.pdf');
    });

    Route::controller(WarehouseItemController::class)->group(function () {
        Route::post('warehouseItems/restore', 'restore');
        Route::get('warehouseItems/showDeleted', 'showDeleted');
    });

    Route::controller(TransactionWarehouseItemController::class)->group(function () {
        Route::post('transactionWarehouseItems/restore', 'restore');
        Route::get('transactionWarehouseItems/showDeleted', 'showDeleted');
        Route::get('transactionWarehouseItems/inventoryForWarehouse', 'inventoryForWarehouse');
        Route::get('transactionWarehouseItems/inventoryForAllWarehouses', 'inventoryForAllWarehouses');
        //Route::get('transactionWarehouseItems/calculateInventory', 'calculateInventory');
    });

    Route::controller(DonorItemController::class)->group(function () {
        Route::post('donorItems/restore', 'restore');
        Route::get('donorItems/showDeleted', 'showDeleted');
    });

    // Keeper Routes
    Route::get('showWarehouseForKeeper', [KeeperWarehouseController::class, 'show']);
    Route::get('inventoryForKeeper', [KeeperWarehouseController::class, 'inventory']);
    Route::get('indexItemForKeeper', [KeeperItemController::class, 'index']);
    Route::get('showItemForKeeper/{item_id}', [KeeperItemController::class, 'show']);
    Route::get('indexTransactionForKeeper', [KeeperTransactionController::class, 'index']);
    Route::get('showTransactionForKeeper/{transaction_id}', [KeeperTransactionController::class, 'show']);

    // Donor Routes
    Route::get('indexTransactionForDonor', [DonorTransactionController::class, 'index']);
    Route::get('showTransactionForDonor/{transaction_id}', [DonorTransactionController::class, 'show']);
    Route::get('indexItemForDonor', [DonorItemForDonorController::class, 'index']);
    Route::get('showItemForDonor/{item_id}', [DonorItemForDonorController::class, 'show']);

 // API Resource Routes
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

});
