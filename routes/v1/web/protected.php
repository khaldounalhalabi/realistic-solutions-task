<?php

use App\Http\Controllers\WEB\v1;
use Illuminate\Support\Facades\Route;

Route::prefix('/dashboard')
    ->group(function () {
        Route::get('/me', [v1\BaseAuthController::class, 'userDetails'])->name('me');
        Route::put('/me', [v1\BaseAuthController::class, 'updateUserDetails'])->name('me.update');
        Route::get('/logout', [v1\BaseAuthController::class, 'logout'])->name('logout');
        Route::inertia('/', 'index')->name('index');
    });

Route::post('/events/export', [v1\EventController::class, 'export'])->name('events.export');
Route::post('/events/import', [v1\EventController::class, 'import'])->name('events.import');
Route::get('/events/get-import-example', [v1\EventController::class, 'getImportExample'])->name('events.import.example');
Route::get('/events/data', [v1\EventController::class, 'data'])->name('events.data');
Route::resource('/events', v1\EventController::class)->names('events');

Route::post('/attendees/export', [v1\AttendeeController::class, 'export'])->name('attendees.export');
Route::post('/attendees/import', [v1\AttendeeController::class, 'import'])->name('attendees.import');
Route::get('/attendees/get-import-example', [v1\AttendeeController::class, 'getImportExample'])->name('attendees.import.example');
Route::get('/attendees/confirm', [v1\AttendeeController::class, 'confirmAttendance'])->name('attendees.confirm');
Route::get('/attendees/data', [v1\AttendeeController::class, 'data'])->name('attendees.data');
Route::resource('/attendees', v1\AttendeeController::class)->names('attendees');
