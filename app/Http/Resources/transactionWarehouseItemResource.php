<?php

namespace App\Http\Resources;

use App\Enums\transactionModeType;
use App\Enums\transactionType;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class transactionWarehouseItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        var_dump($this->id);

        return [
            'id' => $this->id,
            'transaction_id'=> $this->transaction_id,
            'warehouse_id'=>$this->warehouse->name ?? null,
            'transaction_type' => $this->transaction_type instanceof transactionType ? $this->transaction_type->name : null,
            'transaction_mode_type' => $this->transaction_mode_type instanceof transactionModeType ? $this->transaction_mode_type->name : null,
            'item' => $this->item->name ?? null ,
            'quantity' => $this->quantity,
        ];
    }
}
