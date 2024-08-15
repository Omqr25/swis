<?php

use App\Models\Donor;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions',
            function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained();
                $table->boolean('is_convoy');
                $table->json('notes')->nullable();
                $table->string('code')->nullable();
                $table->string('status');
                $table->date('date');
                $table->string('transaction_type');
                $table->string('transaction_mode_type');
                $table->integer('waybill_num');
                $table->string('waybill_img')->default('');
                $table->string('qr_code')->nullable();
                $table->string('CTN')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};