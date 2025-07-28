<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Smith',
            'email' => 'admin@email.com',
        ]);

        $this->call([
            EventSeeder::class,
            AttendeeSeeder::class,
        ]);
    }
}
