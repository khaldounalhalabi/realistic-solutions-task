<?php

namespace App\Models;

use Carbon\Carbon;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                               $id
 * @property string                            $title
 * @property Carbon                            $start_time
 * @property Carbon                            $end_time
 * @property string                            $description
 * @property EloquentCollection<Attendee>|null $attendees
 * @method Builder|Event active()
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
            'attendees' => [
                'name',
                'email',
            ],
        ];
    }

    public static function filterArray(): array
    {
        return [
            [
                'name' => 'start_time',
                'query' => fn(Builder|Event $query, $value) => $query->whereDate('start_time', '<=', Carbon::parse($value)->format('Y-m-d')),
            ],
            [
                'name' => 'end_time',
                'query' => fn(Builder|Event $query, $value) => $query->whereDate('end_time', '>=', Carbon::parse($value)->format('Y-m-d')),
            ],
            [
                'name' => 'is_active',
                'query' => fn(Builder|Event $query, $value) => $query->when($value, fn(Builder|Event $query) => $query->active()),
            ]
        ];
    }

    /**
     * @return  HasMany<Attendee, static>
     */
    public function attendees(): HasMany
    {
        return $this->hasMany(Attendee::class);
    }

    protected function scopeActive(Builder $query): Builder
    {
        return $query->where('start_time', '<=', now()->format('Y-m-d H:i:s'))
            ->where('end_time', '>=', now()->format('Y-m-d H:i:s'));
    }
}
