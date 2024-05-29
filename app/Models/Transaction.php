<?php

namespace App\Models;

use App\Enums\transactionStatusType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'donor_id',
        'warehouse_id',
        'is_convoy',
        'notes',
        'code',
        'status',
        'date',
        'waybill_num',
        'waybill_img',
        'qr_code',
        'CTN',
    ];

    protected $casts = [
        'status'=>transactionStatusType::class,
    ];

    public function donor():BelongsTo
    {
        return $this->belongsTo(Donor::class);
    }

    public function driverTransaction()
    {
        return $this->hasMany(transactionDriver::class);
    }


    public function transactionItem()
    {
        return $this->hasMany(transactionItem::class);
    }

    public function transactionWarehouse()
    {
        return $this->hasMany(transactionWarehouse::class);
    }

    public static function getDisk()
    {
        return Storage::disk('transactions');
    }
    public function imageUrl(string $fieldName)
    {
        if(str_starts_with($this->$fieldName,'http')) {
            return $this->$fieldName;
        }else{

            return $this->$fieldName ? self::getDisk()->url($this->$fieldName) : null;
        }
    }
}
