<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InventoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $result = [
            'item_id' => $this['item_id'],
            'item_name' => $this['item_name']->name,
        ];

        // Only include 'total_quantity_in' if it's not zero
        if ($this['total_quantity_in'] > 0) {
            $result['total_quantity_in'] = $this['total_quantity_in'];
        }

        // Only include 'total_quantity_out' if it's not zero
        if ($this['total_quantity_out'] > 0) {
            $result['total_quantity_out'] = $this['total_quantity_out'];
        }

        return $result;
    }
}
