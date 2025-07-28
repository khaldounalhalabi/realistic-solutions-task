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

    public function activeEvents(array $relations = [])
    {
        $perPage = request()->integer('limit' , 10);
        return $this->globalQuery($relations)->active()->paginate($perPage);
    }
}
