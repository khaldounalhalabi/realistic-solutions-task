<?php

namespace App\Services\v1\Event;

use App\Models\Event;
use App\Repositories\EventRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;

/**
 * @extends BaseService<Event>
 *
 * @property EventRepository $repository
 */
class EventService extends BaseService
{
    use Makable;

    protected string $repositoryClass = EventRepository::class;
}
