<?php

namespace Database\Seeders;

use App\Models\DonorItem;
use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DonorItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $donors = User::all();
        $items = Item::all();

        foreach ($donors as $donor) {
            foreach ($items as $item) {
                $quantity = rand(1, 100);

                $donorItem = DonorItem::firstOrNew([
                    'user_id' => $donor->id,
                    'item_id' => $item->id,
                ]);

                if ($donorItem->exists) {
                    $donorItem->quantity += $quantity;
                } else {
                    $donorItem->quantity = $quantity;
                }

                $donorItem->save();
            }
        }
    }
}
