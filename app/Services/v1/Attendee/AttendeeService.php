<?php

namespace App\Services\v1\Attendee;

use App\Mail\ConfirmPresentEmail;
use App\Models\Attendee;
use App\Repositories\AttendeeRepository;
use App\Services\Contracts\BaseService;
use App\Traits\Makable;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

/**
 * @extends BaseService<Attendee>
 * @property AttendeeRepository $repository
 */
class AttendeeService extends BaseService
{
    use Makable;

    protected string $repositoryClass = AttendeeRepository::class;

    public function store(array $data, array $relationships = []): Attendee
    {
        $email = $data['email'];
        $username = $data['name'];

        $attendee = $this->repository->getByEmail($email);
        if ($attendee) {
            return $this->update($data, $attendee->id);
        }

        $token = Crypt::encrypt([
            'email' => $email,
            'event_id' => $data['event_id'],
            'user_name' => $username,
        ]);
        list($fileName, $filePath) = $this->generateConfirmationQrCode($token);
        $data['qr_code'] = new UploadedFile($filePath, $fileName);
        $data['is_present'] = isset($data['checked_in_at']);
        $attendee = $this->repository->create($data, $relationships);
        Mail::to($email)->send(new ConfirmPresentEmail($attendee));
        return $attendee;
    }

    public function update(array $data, $id, array $relationships = []): ?Attendee
    {
        $attendee = $this->repository->find($id);
        if (!$attendee) {
            return null;
        }
        $email = $data['email'];
        $username = $data['name'];

        if (!isset($data['checked_in_at'])) {
            $token = Crypt::encrypt([
                'email' => $email,
                'user_name' => $username,
                'event_id' => $data['event_id'],
            ]);
            list($fileName, $filePath) = $this->generateConfirmationQrCode($token);
            $data['qr_code'] = new UploadedFile($filePath, $fileName);
        }
        $data['is_present'] = isset($data['checked_in_at']);
        $attendee = $this->repository->update($data, $attendee, $relationships);
        Mail::to($email)->send(new ConfirmPresentEmail($attendee));
        return $attendee;
    }

    private function generateConfirmationQrCode(string $token): array
    {
        $fileName = Str::uuid() . ".svg";
        $dir = storage_path('/app/public/qrcodes');
        $filePath = "$dir/$fileName";
        if (!is_dir($dir)) {
            File::makeDirectory($dir);
        }
        QrCode::size(250)->generate(route('v1.web.protected.attendees.confirm') . "?token=$token", $filePath);
        return array($fileName, $filePath);
    }

    public function confirmAttendance(string $token)
    {
        $data = Crypt::decrypt($token);
        $attendee = $this->repository->getByEmail($data['email']);
        if (!$attendee) {
            return null;
        }

        if ($attendee->event_id != $data['event_id']) {
            return null;
        }

        if ($attendee->name != $data['user_name']) {
            return null;
        }

        return $this->repository->update([
            'is_present' => true,
            'checked_in_at' => now()->format('Y-m-d H:i:s')
        ], $attendee);
    }
}
