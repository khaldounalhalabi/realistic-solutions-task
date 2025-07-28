<?php

namespace Database\Factories;

use App\Models\Attendee;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Http\UploadedFile;

/**
 * @extends Factory<Attendee>
 */
class AttendeeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'email' => fake()->unique()->email(),
            'is_present' => fake()->boolean(),
            'checked_in_at' => fake()->dateTime(),
            'event_id' => Event::factory(),
            'qr_code' => UploadedFile::fake()->image('image.png'),
        ];
    }
}
