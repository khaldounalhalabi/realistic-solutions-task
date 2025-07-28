<?php

use App\Http\Middleware\Authenticate;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function () {

            Route::middleware(['web',])
                ->name('v1.web.public.')
                ->group(base_path('routes\v1\web\public.php'));

            Route::middleware(['web', 'authenticated:web'])
                ->prefix('/v1/')
                ->name('v1.web.protected.')
                ->group(base_path('routes\v1\web\protected.php'));

        }
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        $middleware->alias([
            'authenticated' => Authenticate::class,
        ]);
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

    })->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
