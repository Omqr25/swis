<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class updateUserRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => [ 'confirmed', 'min:8'],
            'email' => [ 'string','email'],
            'code' => [ 'string'],
            'contact_email' => [ 'string','email'],
            'name' => [ 'string'],
            'phone' => [ 'string','phone:Auto',Rule::unique('Users', 'phone')],
            'photo' => [ 'image' , 'mimes:jpeg,jpg,png,gif'],
        ];
    }
}