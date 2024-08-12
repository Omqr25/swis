<?php

namespace App\Models;

use App\Enums\transactionStatusType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Searchable\Searchable;
use Spatie\Searchable\SearchResult;
use Spatie\Translatable\HasTranslations;

class Transaction extends Model implements Searchable
{
    use HasFactory, SoftDeletes, HasTranslations;

    public $translatable = ['notes'];
    protected $fillable = [
        'user_id',
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

    public function getSearchResult(): SearchResult
    {
        $url = route('transactions.search', $this->slug);
        return new SearchResult($this, $this->code, $url);
    }
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function driverTransaction()
    {
        return $this->hasMany(transactionDriver::class);
    }
       public function transactionWarehouseItem()
    {
        return $this->hasMany(transactionWarehouseItem::class);
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
