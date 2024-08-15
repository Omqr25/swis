<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\transactionStatusType;
use App\Enums\userType;
use App\Exports\TransactionsExport;
use App\Http\Controllers\Controller;
use App\Http\Repositories\QRImageWithLogo;
use App\Http\Repositories\transactionRepository;
use App\Http\Requests\Transaction\StoreTransactionRequest;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Http\Resources\TransactionResource;
use App\Http\Resources\DonorTransactionResource;
use App\Http\Responses\Response;
use App\Http\services\QRCodeService;
use App\Models\Transaction;
use App\Models\User;
use App\Notifications\TransactionCreated;
use App\Services\TransactionService;
use App\Traits\FileUpload;
use App\Traits\QrCodeHelper;
use chillerlan\QRCode\Common\EccLevel;
use chillerlan\QRCode\Data\QRMatrix;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class TransactionController extends Controller
{
    use FileUpload;
    private transactionRepository $transactionRepository;
    private QRCodeService $qrCodeService;

    public function __construct(transactionRepository $transactionRepository,QRCodeService $qrCodeService)
    {
        $this->transactionRepository = $transactionRepository;
        $this->qrCodeService = $qrCodeService;
        $this->middleware(['auth:sanctum']);
    }
    public function index(): JsonResponse
    {

        $data=$this->transactionRepository->index();
        return $this->showAll($data['Transaction'],TransactionResource::class,$data['message']);

    }

    public function show(Transaction $transaction): JsonResponse
    {
//        dd($transaction['transaction_type']);

        return $this->showOne($transaction,TransactionResource::class);

    }
    public function store(StoreTransactionRequest $request): JsonResponse
    {
        $dataItem = $request->validated();

        if (Auth::user()->type->value != userType::admin->value) { // Not an admin
            $dataItem['user_id'] = Auth::user()->id;
        }

        $transaction = null;

        // Update system and donor item quantities
        $this->transactionRepository->UpdateSystemItemsQuantity($dataItem);
        $this->transactionRepository->UpdateDonorItemsQuantity($dataItem);

        // Handle waybill image upload
        // if ($request->hasFile('waybill_img')) {
        //     $file = $request->file('waybill_img');
        //     $fileName = 'Transaction/' . 'waybill_Images/' . $file->hashName();
        //     $imagePath = $this->createFile($request->file('waybill_img'), Transaction::getDisk(), filename: $fileName);
        //     $dataItem['waybill_img'] = $imagePath;
        // }
            $transaction = $this->transactionRepository->create($dataItem);
        

        // Generate QR code
        $imagePath = $this->qrCodeService->generateQRCode($transaction['Transaction']);
        $dataItem['qr_code'] = $imagePath;
        $transaction = $this->transactionRepository->update($dataItem, $transaction['Transaction']);

        // Send notification to admins
        $admin = User::where('type', userType::admin->value)->first();
        if (!$admin) {
            $admin->notify(new TransactionCreated($transaction['Transaction'], Auth::user()));
        }

        return $this->showOne($transaction['Transaction'], TransactionResource::class, $transaction['message']);
    }

    public function update(UpdateTransactionRequest $request,Transaction $transaction): JsonResponse
    {
        $dataItem=$request->validated();
        if ($request->hasFile('waybill_img')) {
            $file = $request->file('waybill_img');
            $name ='Transaction/'.'waybill_Images/' . $file->hashName() ;
            $imagePath = $this->createFile($request->file('waybill_img'), Transaction::getDisk(),filename:  $name);
            $dataItem['waybill_img'] = $imagePath;
        }
        $data = $this->transactionRepository->update($dataItem, $transaction);
        return $this->showOne($data['Transaction'],TransactionResource::class,$data['message']);

    }


    public function destroy(Transaction $transaction)
    {
        $data = $this->transactionRepository->destroy($transaction);
        return [$data['message'],$data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->transactionRepository->showDeleted();
        return $this->showAll($data['Transaction'],TransactionResource::class,$data['message']);
    }
    public function restore(Request $request){

        $data = $this->transactionRepository->restore($request);
        return [$data['message'],$data['code']];
    }
    public function transactionCompletedExport()
    {
        // Define the file name and path
        $fileName = 'Completed_transaction_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/exports/transactions/' . $fileName;

        $users = Transaction::where('status', transactionStatusType::COMPLETED->value)->get();

        $export = new TransactionsExport($users);

        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' =>  Storage::disk('public')->url($filePath)
        ]);
    }
    public function transactionInDeliveryExport()
    {
        // Define the file name and path
        $fileName = 'InDelivery_transaction_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/exports/transactions/' . $fileName;

        $users = Transaction::where('status', transactionStatusType::InDelivery->value)->get();

        $export = new TransactionsExport($users);

        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' =>  Storage::disk('public')->url($filePath)
        ]);
    }


}