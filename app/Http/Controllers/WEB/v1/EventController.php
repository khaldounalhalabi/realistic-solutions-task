<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\Event\StoreUpdateEventRequest;
use App\Http\Resources\v1\EventResource;
use App\Models\Event;
use App\Services\v1\Event\EventService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends WebController
{
    private EventService $eventService;

    public function __construct()
    {
        $this->eventService = EventService::make();
        // place the relations you want to return them within the response
        $this->relations = [];
    }

    public function data()
    {
        $items = $this->eventService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = Event::getModel()->exportable();

        return Inertia::render('dashboard/events/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($eventId)
    {
        $event = $this->eventService->view($eventId, $this->relations);

        return Inertia::render('dashboard/events/show', [
            'event' => EventResource::make($event),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/events/create');
    }

    public function store(StoreUpdateEventRequest $request)
    {
        /** @var Event|null $item */
        $event = $this->eventService->store($request->validated(), $this->relations);
        if ($event) {
            return redirect()
                ->route('v1.web.protected.events.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($eventId)
    {
        $event = $this->eventService->view($eventId, $this->relations);

        if (! $event) {
            abort(404);
        }

        return Inertia::render('dashboard/events/edit', [
            'event' => EventResource::make($event),
        ]);
    }

    public function update(StoreUpdateEventRequest $request, $eventId)
    {
        /** @var Event|null $item */
        $event = $this->eventService->update($request->validated(), $eventId, $this->relations);
        if ($event) {
            return redirect()
                ->route('v1.web.protected.events.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($eventId)
    {
        $result = $this->eventService->delete($eventId);

        return rest()
            ->when(
                $result,
                fn($rest) => $rest->ok()->deleteSuccess(),
                fn($rest) => $rest->noData(),
            )->send();
    }

    public function export(Request $request)
    {
        $ids = $request->ids ?? [];

        try {
            $result = $this->eventService->export($ids);
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function getImportExample()
    {
        try {
            $result = $this->eventService->getImportExample();
            session()->flash('success', trans('site.success'));

            return $result;
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function import(Request $request)
    {
        try {
            $request->validate(['excel_file' => 'required|mimes:xls,xlsx']);
            $this->eventService->import();

            return redirect()
                ->back()
                ->with('message', trans('site.success'));
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('message', trans('site.something_went_wrong'));
        }
    }

    public function activeEvents()
    {
        $items = $this->eventService->activeEvents($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }
}
