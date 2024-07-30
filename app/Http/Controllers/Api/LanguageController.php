<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Responses\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;

class LanguageController extends Controller
{
    public function switch($locale)
    {
        if (!in_array($locale, config('app.available_locales'))) {
            return Response::Error(null, "$locale language is not provided", 200);
        }
        Cache::put('locale', $locale);
        return Response::Success($locale, "$locale is set successfully", 200);
    }
}
