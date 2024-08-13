<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TransactionWarehouseItem extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'transaction_id',
        'warehouse_id',
        'item_id',
        'quantity',
    ];

    // Define relationships
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }
    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
