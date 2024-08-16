<?php

namespace App\Enums;

enum transactionModeType :  int
{
    //for transaction IN
    case Received_from_Partners = 1;
    case Received_from_warehouses= 2;
    case Return_from_Distribution= 3;


    //for transaction OUT
    case out_for_Distribution= 4;
    case out_for_warehouses= 5;
    case loss= 6;
    case damage= 7;
}
