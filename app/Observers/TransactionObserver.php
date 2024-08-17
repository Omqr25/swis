<?php

namespace App\Observers;

use App\Models\Transaction;

class TransactionObserver
{
    /**
     * Handle the Transaction "created" event.
     */
    public function created(Transaction $transaction): void
    {
        $code = (50000 + $transaction->id);
        $transaction->code = $code;
        $transaction->save();
    }
}
