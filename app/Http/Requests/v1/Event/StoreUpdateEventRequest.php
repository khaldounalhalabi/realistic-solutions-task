<?php

namespace App\Http\Requests\v1\Event;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateEventRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255', 'min:3'],
            'start_time' => ['required', 'date', 'date_format:Y-m-d H:i', 'before:end_time'],
            'end_time' => ['required', 'date', 'date_format:Y-m-d H:i', 'after:start_time'],
            'description' => ['required', 'max:5000', 'min:5'],
        ];
    }
}
