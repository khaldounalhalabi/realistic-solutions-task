<?php

namespace App\Repositories;

use App\Models\Event;
use App\Repositories\Contracts\BaseRepository;

/**
 * @extends  BaseRepository<Event>
 */
class EventRepository extends BaseRepository
{
    protected string $modelClass = Event::class;
}
