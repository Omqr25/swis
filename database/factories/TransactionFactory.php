<?php

namespace Database\Factories;

use App\Enums\transactionModeType;
use App\Enums\transactionType;
use App\Enums\transactionStatusType;
use App\Http\services\QRCodeService;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Warehouse;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fakerArabic = \Faker\Factory::create('ar_SA');

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'is_convoy' => $this->faker->boolean(),
            'notes' => [
                'en' => fake()->optional()->sentence,
                'ar' => $fakerArabic->optional()->sentence,
            ],
            'code' => $this->faker->word,
            'status' => $this->faker->randomElement(transactionStatusType::class),
            'date' => $this->faker->date(),
            'transaction_type' => $this->faker->randomElement(transactionType::class),
            'transaction_mode_type' => $this->faker->randomElement(transactionModeType::class),
            'waybill_num' => $this->faker->numberBetween(1000, 9999),
            'waybill_img' => $this->faker->imageUrl(),
            'qr_code' => null,
            'CTN'=>$this->faker->numberBetween(1000, 9999),
        ];
    }
    //   public function configure()
    //   {
    //       return $this->afterCreating(function (Transaction $transaction) {
    //           $qrCodeService = app(QRCodeService::class);
    //           $qrCodePath = $qrCodeService->generateQRCode( $transaction);

    //           $transaction->qr_code = $qrCodePath;
    //           $transaction->save();
    //       });
    //   }
}
