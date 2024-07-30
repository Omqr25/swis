<?php

namespace App\Models;

use App\Enums\sectorType;
use App\Enums\unitType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Item extends Model
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
}
