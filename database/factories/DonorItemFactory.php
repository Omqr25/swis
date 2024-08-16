<?php

namespace Database\Factories;

use App\Models\Donor;
use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\donorItem>
 */
class DonorItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->unique(true);
        return [
            'user_id' => $this->faker->unique()->randomElement(item::pluck('id')->toArray()),
            'item_id' => $this->faker->unique()->randomElement(User::pluck('id')->toArray()),
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
