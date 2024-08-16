<?php

namespace App\Models;

use App\Enums\sectorType;
use App\Enums\unitType;
use Carbon\Carbon;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Translatable\HasTranslations;

class Item extends Model implements Searchable
{
    use HasFactory, SoftDeletes, HasTranslations;

    public $translatable = ['name'];
    protected $fillable = [
        'name',
        'code',
        'sectorType',
        'unitType',
        'size',
        'weight',
        'quantity',
    ];
    protected $casts=[
        'unitType'=>unitType::class ,
        'sectorType'=>sectorType::class ,
    ];

    public function getSearchResult(): SearchResult
    {
        $url = route('items.search', $this->slug);
        return new SearchResult($this, $this->name, $url);
    }
    public function scopeSize(Builder $query, $less=0 , $great=1e10): Builder
    {
        return $query->whereBetween('size',[$less , $great]);
    }
    public function scopeWeight(Builder $query, $less=0 , $great=1e10): Builder
    {
        return $query->whereBetween('weight',[$less , $great]);
    }
    public function scopeQuantity(Builder $query, $less=0 , $great=1e10): Builder
    {
        return $query->whereBetween('quantity',[$less , $great]);
    }
    public function scopeCreatedBetween(Builder $query, $startDate , $endDate): Builder
    {
        return $query->whereBetween('created_at', [Carbon::parse($startDate),Carbon::parse($endDate)->addDay()]);
    }
    public function warehouseItem()
    {
        return $this->hasMany(WarehouseItem::class);
    }
    public function donorItems(): HasMany
    {
        return $this->hasMany(donorItem::class);
    }
    public function transactionWarehouseItem():HasMany
    {
        return $this->hasMany(transactionWarehouseItem::class);
    }
    public function warehouse(): BelongsToMany
    {
        return $this->belongsToMany(Warehouse::class,'warehouse_items');
    }
}
