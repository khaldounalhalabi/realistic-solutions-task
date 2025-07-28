<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Attendee;
use Illuminate\Http\Request;

/** @mixin Attendee */
class AttendeeResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_present' => $this->is_present,
            'checked_in_at' => $this->checked_in_at?->format('Y-m-d H:i'),
            'event_id' => $this->event_id,
            'qr_code' => $this->qr_code,
            'event' => EventResource::make($this->whenLoaded('event')),
        ];
    }
}
