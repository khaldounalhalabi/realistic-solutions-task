<?php

namespace Database\Seeders;

use App\Models\Attendee;
use Illuminate\Database\Seeder;

class AttendeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Attendee::factory(10)->create();
    }
}
