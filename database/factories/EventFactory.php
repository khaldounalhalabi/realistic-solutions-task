<?php

namespace Database\Factories;

use App\Models\Attendee;
use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Event>
 */
class EventFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->word(),
            'start_time' => fake()->dateTimeBetween('-15 days', '+15 days'),
            'end_time' => fake()->dateTimeBetween('-5 days', '+45 days'),
            'description' => fake()->text(),
        ];
    }

    public function withAttendees(int $count = 1): static
    {
        return $this->has(Attendee::factory($count));
    }
}
