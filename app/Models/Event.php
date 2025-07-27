<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    id
 * @property string $title
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property string $description
 * @mixin Builder<Event>
 * @use  HasFactory<EventFactory>
 */
class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_time',
        'end_time',
        'description',

    ];

    protected function casts(): array
    {
        return [
            'start_time' => 'datetime',
            'end_time' => 'datetime',
        ];
    }

    public function exportable(): array
    {
        return [
            'title',
            'start_time',
            'end_time',
            'description',
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'title',
            'description',
        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [

        ];
    }

    public static function filterArray(): array
    {
        return [
            [
                'name' => 'start_time',
            ],
            [
                'name' => 'end_time'
            ]
        ];
    }
}
