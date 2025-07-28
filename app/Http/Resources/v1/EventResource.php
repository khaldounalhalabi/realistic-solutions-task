<?php

namespace App\Http\Resources\v1;

use App\Http\Resources\BaseResource\BaseResource;
use App\Models\Event;
use Illuminate\Http\Request;

/** @mixin Event */
class EventResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'start_time' => $this->start_time?->format('Y-m-d H:i'),
            'end_time' => $this->end_time?->format('Y-m-d H:i'),
            'description' => $this->description,
            'attendees' => AttendeeResource::collection($this->whenLoaded('attendees')),
        ];
    }
}
