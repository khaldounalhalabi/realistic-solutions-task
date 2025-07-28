<?php

namespace App\Http\Requests\v1\Attendee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUpdateAttendeeRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'min:3'],
            'email' => ['required', 'string', 'max:255', 'email', 'min:6'],
            'checked_in_at' => ['nullable', 'date', 'date_format:Y-m-d H:i'],
            'event_id' => ['numeric', 'required', Rule::exists('events', 'id')],
        ];
    }
}
