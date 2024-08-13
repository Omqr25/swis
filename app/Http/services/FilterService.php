<?php

namespace App\Http\services;

use App\Models\Item;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedSort;
use Spatie\QueryBuilder\QueryBuilder;

class FilterService
{
    public static function item()
    {
        $data = QueryBuilder::for(Item::class)
            ->allowedFilters([
                AllowedFilter::exact('sector', 'sectorType'),
                AllowedFilter::exact('unit', 'unitType'),
                AllowedFilter::scope('size'),
                AllowedFilter::scope('weight'),
                AllowedFilter::scope('quantity'),
                AllowedFilter::scope('created_between'),
            ])
            ->defaultSort('name->en')
            ->allowedSorts([
                AllowedSort::field('name','name->en'),
                'size',
                'weight',
                'quantity',
                'created_between'
            ])
            ->get();
        return $data;
    }
}
