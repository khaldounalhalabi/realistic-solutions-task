<?php

namespace App\Http\Controllers\WEB\v1;

use App\Http\Controllers\WebController;
use App\Http\Requests\v1\Attendee\StoreUpdateAttendeeRequest;
use App\Http\Resources\v1\AttendeeResource;
use App\Models\Attendee;
use App\Services\v1\Attendee\AttendeeService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendeeController extends WebController
{
    private AttendeeService $attendeeService;

    public function __construct()
    {
        $this->attendeeService = AttendeeService::make();
        $this->relations = ['event'];
    }

    public function data()
    {
        $items = $this->attendeeService->indexWithPagination($this->relations);

        return rest()
            ->ok()
            ->getSuccess()
            ->data($items)
            ->send();
    }

    public function index()
    {
        $exportables = Attendee::getModel()->exportable();

        return Inertia::render('dashboard/attendees/index', [
            'exportables' => $exportables,
        ]);
    }

    public function show($attendeeId)
    {
        $attendee = $this->attendeeService->view($attendeeId, $this->relations);

        return Inertia::render('dashboard/attendees/show', [
            'attendee' => AttendeeResource::make($attendee),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/attendees/create');
    }

    public function store(StoreUpdateAttendeeRequest $request)
    {
        /** @var Attendee|null $item */
        $attendee = $this->attendeeService->store($request->validated(), $this->relations);
        if ($attendee) {
            return redirect()
                ->route('v1.web.protected.attendees.index')
                ->with('success', trans('site.stored_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.something_went_wrong'));
    }

    public function edit($attendeeId)
    {
        $attendee = $this->attendeeService->view($attendeeId, $this->relations);

        if (!$attendee) {
            abort(404);
        }

        return Inertia::render('dashboard/attendees/edit', [
            'attendee' => AttendeeResource::make($attendee),
        ]);
    }

    public function update(StoreUpdateAttendeeRequest $request, $attendeeId)
    {
        /** @var Attendee|null $item */
        $attendee = $this->attendeeService->update($request->validated(), $attendeeId, $this->relations);
        if ($attendee) {
            return redirect()
                ->route('v1.web.protected.attendees.index')
                ->with('success', trans('site.update_successfully'));
        }

        return redirect()
            ->back()
            ->with('error', trans('site.there_is_no_data'));
    }

    public function destroy($attendeeId)
    {
        $result = $this->attendeeService->delete($attendeeId);

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
            $result = $this->attendeeService->export($ids);
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
            $result = $this->attendeeService->getImportExample();
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
            $this->attendeeService->import();

            return redirect()
                ->back()
                ->with('success', trans('site.success'));
        } catch (Exception) {
            return redirect()
                ->back()
                ->with('error', trans('site.something_went_wrong'));
        }
    }

    public function confirmAttendance(Request $request)
    {
        $token = $request->string('token');
        $result = $this->attendeeService->confirmAttendance($token);
        if ($result) {
            return redirect()
                ->route('v1.web.protected.attendees.index')
                ->with('success', trans('site.success'));
        } else {
            return redirect()
                ->back()
                ->with('error', trans('site.there_is_no_data'));
        }
    }

    public function register(StoreUpdateAttendeeRequest $request)
    {
        $attendee = $this->attendeeService->store($request->validated(), $this->relations);

        if ($attendee) {
            return redirect()->back()->with('success', trans('site.success'));
        }

        return redirect()->back()->with('error', trans('site.something_went_wrong'));
    }
}
