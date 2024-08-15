<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use MatanYadaev\EloquentSpatial\Objects\Point;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Translatable\HasTranslations;

class Warehouse extends Model implements Searchable
{
    use HasFactory,SoftDeletes,HasTranslations;

    public $translatable = ['name'];
    protected $fillable = [
        'name',
        'code',
        'location',
        'branch_id',
        'capacity',
        'parent_id',
        'user_id',
        'is_Distribution_point',
    ];
    protected $casts = [
        'location' => Point::class,
    ];
    public function getSearchResult(): SearchResult
    {
        $url = route('warehouses.search', $this->slug);
        return new SearchResult($this, $this->name, $url);
    }
    public function branch(){
        return $this->belongsTo(Branch::class);
    }
    public function warehouseItem(){
        return$this->hasMany(WarehouseItem::class);
    }
    public function parentWarehouse():BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'parent_id');
    }

    public function transactionWarehouseItem()
    {
        return $this->hasMany(transactionWarehouseItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item(): BelongsToMany
    {
        return $this->belongsToMany(Item::class,'warehouse_items');
    }
}
