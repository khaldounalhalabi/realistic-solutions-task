<?php

use App\Http\Controllers\WEB\v1;
use App\Http\Controllers\WEB\v1\AttendeeController;
use App\Http\Controllers\WEB\v1\EventController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1/dashboard')
    ->group(function () {
        Route::post('/login', [v1\BaseAuthController::class, 'login'])->name('login');
        Route::post('/register', [v1\BaseAuthController::class, 'register'])->name('register');
        Route::post('/request-reset-password', [v1\BaseAuthController::class, 'requestResetPassword'])->name('request.reset.password');
        Route::post('/reset-password', [v1\BaseAuthController::class, 'resetPassword'])->name('reset.password');
        Route::post('/validate-reset-password-code', [v1\BaseAuthController::class, 'validateResetPasswordCode'])->name('validate.reset.password.code');
        Route::inertia('/login', 'login')->name('login.page');
        Route::inertia('/request-reset-password', 'forget-password')->name('request.reset.password.page');
        Route::inertia('/reset-password', 'reset-password')->name('reset.password.page');
    });


Route::post("/v1/events/register", [AttendeeController::class, 'register'])->name('attendees.register');
Route::get("/v1/active-events" , [EventController::class, 'activeEvents'])->name('active.events');
Route::inertia('/', 'homepage');
