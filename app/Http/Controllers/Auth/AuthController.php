<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Repositories\AuthRepository;
use App\Http\Requests\Auth\CompleteProfileRequest;
use App\Http\Requests\Auth\LoginRequests;
use App\Http\Requests\Auth\registerRequests;
use App\Http\Responses\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class AuthController extends Controller
{

    private AuthRepository $authRepository;
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
        $this->middleware(['auth:sanctum'])->only(['logout','completeProfile']);
    }

    public function login(LoginRequests $request): JsonResponse
    {

        $userData = $this->authRepository->login($request->validated());

        return Response::Success($userData['User'], $userData['message'], $userData['code']);
    }

    public function logout(): JsonResponse
    {

        $userData = $this->authRepository->logout();
        return Response::Success($userData['User'], $userData['message']);
    }

    public function register(registerRequests $request): JsonResponse
    {

        $userData = $this->authRepository->register($request->validated());

        return Response::Success($userData['User'], $userData['message']);
    }
    public function completeProfile(CompleteProfileRequest $request): JsonResponse
    {
        $nowData = $request->validated();
        $userData = $this->authRepository->completeProfile($nowData);

        return Response::Success($userData['User'], $userData['message'], $userData['code']);
    }
}
