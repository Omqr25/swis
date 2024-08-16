<?php

use App\Http\Controllers\Api\Admin\DonorController;
use App\Http\Controllers\Api\Admin\DonorItemController;
use App\Http\Controllers\Api\Admin\DriverController;
use App\Http\Controllers\Api\Admin\FileController;
use App\Http\Controllers\Api\Admin\ItemController;
use App\Http\Controllers\Api\Admin\BranchController;
use App\Http\Controllers\Api\Admin\NotificationController;
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
require_once __DIR__ .'/Api/Admin.php';
require_once __DIR__ .'/Api/Donor.php';
require_once __DIR__ .'/Api/Keeper.php';


Route::middleware(['auth:sanctum', 'Localization'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(['auth:sanctum', 'Localization'])->group(function () {

    Route::controller(SearchController::class)->group(function () {
        Route::get('search/searchitems', 'searchItems')->name('items.search');
        Route::get('search/searchdrivers', 'searchDrivers')->name('drivers.search');
        Route::get('search/searchtransactions', 'searchTransactions')->name('transactions.search');
        Route::get('search/searchwarehouses', 'searchWarehouses')->name('warehouses.search');
        Route::get('search/searchwarehouses_items', 'searchWarehousesItems')->name('warehouses_items.search');
        Route::get('search/searchbranches', 'searchBranches')->name('branches.search');
        Route::get('search/searchusers', 'searchUsers')->name('users.search');
    });
});
