<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\Response;
use App\Models\Branch;
use App\Models\Driver;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Spatie\Searchable\ModelSearchAspect;
use Spatie\Searchable\Search;
use Throwable;

class SearchController extends Controller
{
    public function searchItems(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(Item::class, ['name->en', 'name->ar' , 'code'])
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such items');
        return Response::Success($searchResults, 'Items retrieved successfully');
    }

    public function searchDrivers(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(Driver::class, [
                    'name->en',
                    'name->ar',
                    // 'vehicle_number',
                    // 'national_id',
                    // 'transportation_company_name->en',
                    // 'phone',
                ])
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such drivers');
        return Response::Success($searchResults, 'Drivers retrieved successfully');
    }

    public function searchTransactions(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(Transaction::class, ['code'])
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such transactions');
        return Response::Success($searchResults, 'Transactions retrieved successfully');
    }

    public function searchWarehouses(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(
                    Warehouse::class,
                    function (ModelSearchAspect $modelSearchAspect) {
                        $modelSearchAspect
                            ->addSearchableAttribute('name->en')
                            ->addSearchableAttribute('name->ar')
                            ->addSearchableAttribute('code')
                            ->with(['branch', 'parentWarehouse', 'user']);
                    }
                )
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such warehouses');
        return Response::Success($searchResults, 'Warehouses retrieved successfully');
    }

    public function searchBranches(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(Branch::class, ['name->en', 'name->ar' , 'code'])
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such branches');
        return Response::Success($searchResults, 'Branches retrieved successfully');
    }

    public function searchUsers(Request $request)
    {
        $query = $request->query('query');

        try {
            $searchResults = (new Search())
                ->registerModel(User::class, [
                    'name->en',
                    'name->ar',
                    'code',
                    // 'phone',
                    // 'email',
                ])
                ->search($query);
        } catch (Throwable $th) {
            return Response::Error(null, $th->getMessage());
        }

        if ($searchResults->isEmpty()) return Response::Error(null, 'There is no such users');
        return Response::Success($searchResults, 'Users retrieved successfully');
    }

}
