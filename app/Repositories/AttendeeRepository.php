<?php

namespace App\Repositories;

use App\Models\Attendee;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Attendee>
 */
class AttendeeRepository extends BaseRepository
{
    protected string $modelClass = Attendee::class;

    public function getByEmail(string $email): ?Attendee
    {
        return Attendee::where('email', $email)->first();
    }
}
