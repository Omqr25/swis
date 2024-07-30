<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class Driver extends Model
{
  use HasFactory, SoftDeletes, HasTranslations;

  public $translatable = ['name', 'transportation_company_name'];

  protected $fillable = [
    'id',
    'name',
    'vehicle_number',
    'national_id',
    'transportation_company_name',
    'phone',
  ];

  public function transactions()
  {
    return $this->belongsToMany(Transaction::class);
  }

}
