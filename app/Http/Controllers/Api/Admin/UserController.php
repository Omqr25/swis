<?php

namespace App\Http\Controllers\Api\Admin;

use App\Enums\userType;
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Repositories\userRepository;
use App\Http\Requests\User\storeUserRequests;
use App\Http\Requests\User\updateUserRequests;
use App\Http\Resources\UserResource;
use App\Http\Responses\Response;
use App\Models\User;
use App\Traits\FileUpload;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    use FileUpload;
    private userRepository $userRepository;
    public function __construct(userRepository $userRepository)
    {
        $this->userRepository =$userRepository;
//        $this->middleware(['auth:sanctum']);
    }
    public function index()
    {
        $data=$this->userRepository->index();
        return $this->showAll($data['User'],UserResource::class,$data['message']);
    }


    public function show(User $user): JsonResponse
    {

        return $this->showOne($user,UserResource::class);

    }
    public function store(storeUserRequests $request): JsonResponse
    {
        $dataUser=$request->validated();
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $name ='users_image/' . $file->hashName() ;
            $imagePath = $this->createFile($request->file('photo'), User::getDisk(), $name);
            $dataUser['photo'] = $imagePath;
        }

        $data=$this->userRepository->create($dataUser);
        return $this->showOne($data['User'],UserResource::class,$data['message']);

    }

    public function update(updateUserRequests $request,User $user): JsonResponse
    {
        $dataUser=$request->validated();
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $name ='users_image/' . $file->hashName() ;
            $imagePath = $this->createFile($request->file('photo'), User::getDisk(), $name);
            $dataUser['photo'] = $imagePath;
        }
        $data = $this->userRepository->update($dataUser, $user);
        return $this->showOne($data['User'],UserResource::class,$data['message']);

    }


    public function destroy(User $user)
    {
        $data = $this->userRepository->destroy($user);

      return [$data['message'],$data['code']];

    }

    public function showDeleted(): JsonResponse
    {
        $data=$this->userRepository->showDeleted();
        return $this->showAll($data['User'],UserResource::class,$data['message']);
    }
    public function restore(Request $request){

        $data = $this->userRepository->restore($request);
        return [$data['message'],$data['code']];
    }

    public function indexKeeper(): JsonResponse
    {
        $data = $this->userRepository->indexKeeper();
        return $this->showAll($data['Keeper'], UserResource::class, $data['message']);
    }

    public function indexDonor(): JsonResponse
    {

        $data = $this->userRepository->indexDonor();
        return $this->showAll($data['Donor'], UserResource::class, $data['message']);

    }

    public function keeperExport()
    {
        // Define the file name and path
        $fileName = 'users_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/exports/users/' . $fileName;

        $users = User::where('type', userType::keeper->value)->get();

        $export = new UsersExport($users);

        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' => route('users.download', ['fileName' => $fileName])
        ]);
    }
    public function donorExport()
    {
        // Define the file name and path
        $fileName = 'users_' . now()->format('Y_m_d_H_i_s') . '.xlsx';
        $filePath = 'public/exports/users/' . $fileName;

        $users = User::where('type', userType::donor->value)->get();

        $export = new UsersExport($users);

        Excel::store($export, $filePath);

        return response()->json([
            'message' => 'File exported and saved successfully!',
            'file_name' => $fileName,
            'file_url' => route('users.download', ['fileName' => $fileName])
        ]);
    }
    public function downloadFile($fileName)
    {
        $filePath = 'public/exports/users/' . $fileName;

        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        }

        return response()->json([
            'message' => 'File not found!'
        ], 404);
    }

    public function exportPdf()
    {
        return Excel::download(new UsersExport(), 'users.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
    }


}
