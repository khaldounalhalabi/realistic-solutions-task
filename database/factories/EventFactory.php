<?php

namespace Database\Factories;

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
            'start_time' => fake()->dateTime(),
            'end_time' => fake()->dateTime(),
            'description' => fake()->text(),
        ];
    }
}
