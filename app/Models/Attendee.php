<?php

namespace App\Models;

use App\Casts\MediaCast;
use App\Services\v1\Attendee\AttendeeService;
use App\Traits\HasMedia;
use Carbon\Carbon;
use Database\Factories\AttendeeFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int                                                             $id
 * @property string                                                          $name
 * @property string                                                          $email
 * @property bool                                                            $is_present
 * @property Carbon                                                          $checked_in_at
 * @property int                                                             $event_id
 * @property array{url:string,size:string,extension:string,mime_type:string} $qr_code
 * @property Event|null                                                      $event
 * @method Builder|Attendee isPresent()
 * @mixin Builder<Attendee>
 * @use  HasFactory<AttendeeFactory>
 */
class Attendee extends Model
{
    use HasFactory;
    use HasMedia;

    protected $fillable = [
        'name',
        'email',
        'is_present',
        'checked_in_at',
        'event_id',
        'qr_code',

    ];

    protected function casts(): array
    {
        return [
            'is_present' => 'boolean',
            'checked_in_at' => 'datetime',
            'qr_code' => MediaCast::class,
        ];
    }

    public function exportable(): array
    {
        return [
            'name',
            'email',
            'is_present',
            'checked_in_at',
            'event.id',
            'event.title',
        ];
    }

    public static function searchableArray(): array
    {
        return [
            'name',
            'email',

        ];
    }

    public static function relationsSearchableArray(): array
    {
        return [
            'event' => ['title', 'description'],

        ];
    }

    public static function filterArray(): array
    {
        return [
            [
                'name' => 'event_id',
            ],
            [
                'name' => 'is_present',
                'query' => fn(Attendee|Builder $query, $value) => $query->where('is_present', request()->boolean('is_present')),
            ],
            [
                'name' => 'checked_in_at',
                'query' => fn(Attendee|Builder $query, $value) => $query->whereDate('checked_in_at', Carbon::parse($value)->format('Y-m-d')),
            ]
        ];
    }

    public function scopeIsPresent(Builder $query): Builder
    {
        return $query->where('is_present', true);
    }

    /**
     * @return  BelongsTo<Event, static>
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function import(array $row): ?static
    {
        return AttendeeService::make()->store($row);
    }
}
