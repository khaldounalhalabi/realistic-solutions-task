<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;

Route::get('/v1/dashboard/me', [v1\BaseAuthController::class, 'userDetails'])->name('v1.web.protected.me');
Route::put('/v1/dashboard/me', [v1\BaseAuthController::class, 'updateUserDetails'])->name('v1.web.protected.me.update');
Route::get('/v1/dashboard/logout', [v1\BaseAuthController::class, 'logout'])->name('v1.web.protected.logout');

Route::inertia('/v1/dashboard', 'index')->name('v1.web.protected.index');
Route::post('/v1/events/export', [v1\EventController::class, 'export'])->name('v1.web.protected.events.export');
Route::post('/v1/events/import', [v1\EventController::class, 'import'])->name('v1.web.protected.events.import');
Route::get('/v1/events/get-import-example', [v1\EventController::class, 'getImportExample'])->name('v1.web.protected.events.import.example');
Route::get('/v1/events/data', [v1\EventController::class, 'data'])->name('v1.web.protected.events.data');
Route::resource('/v1/events', v1\EventController::class)->names('v1.web.protected.events');

Route::post('/v1/attendees/export', [v1\AttendeeController::class, 'export'])->name('v1.web.protected.attendees.export');
Route::post('/v1/attendees/import', [v1\AttendeeController::class, 'import'])->name('v1.web.protected.attendees.import');
Route::get('/v1/attendees/get-import-example', [v1\AttendeeController::class, 'getImportExample'])->name('v1.web.protected.attendees.import.example');
Route::get('/v1/attendees/confirm', [v1\AttendeeController::class, 'confirmAttendance'])->name('v1.web.protected.attendees.confirm');
Route::get('/v1/attendees/data', [v1\AttendeeController::class, 'data'])->name('v1.web.protected.attendees.data');
Route::resource('/v1/attendees', v1\AttendeeController::class)->names('v1.web.protected.attendees');
