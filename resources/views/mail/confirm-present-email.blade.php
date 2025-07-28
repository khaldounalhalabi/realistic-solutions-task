@php
    use App\Models\Attendee;use Carbon\Carbon;
    /** @var Attendee $attendee */
@endphp
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Attendance Confirmation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }

        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #2c3e50;
        }

        .event-details {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
            border-left: 4px solid #667eea;
        }

        .event-details h2 {
            margin: 0 0 15px 0;
            color: #2c3e50;
            font-size: 20px;
        }

        .detail-row {
            margin: 10px 0;
            font-size: 16px;
        }

        .detail-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            width: 100px;
        }

        .qr-section {
            text-align: center;
            margin: 30px 0;
            padding: 30px;
            background-color: #ffffff;
            border: 2px dashed #667eea;
            border-radius: 12px;
        }

        .qr-title {
            font-size: 20px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .qr-code {
            display: inline-block;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin: 15px 0;
        }

        .qr-code img {
            display: block;
            max-width: 200px;
            height: auto;
        }

        .qr-instructions {
            color: #666;
            font-size: 14px;
            margin-top: 15px;
            line-height: 1.5;
        }

        .important-note {
            background-color: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 25px 0;
            color: #856404;
        }

        .important-note strong {
            color: #856404;
        }

        .footer {
            background-color: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e9ecef;
        }

        .footer p {
            margin: 5px 0;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }

            .content {
                padding: 20px;
            }

            .event-details {
                padding: 20px;
            }

            .qr-section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
<div class="email-container">
    <div class="header">
        <h1>Event Attendance Confirmation</h1>
    </div>
    <div class="content">
        <div class="greeting">
            Hello <strong>{{ $attendee->name }}</strong>,
        </div>

        <p>
            Thank you for registering for our event! We're excited to have you join us.
            Please find your attendance confirmation details below.
        </p>
        <div class="event-details">
            <h2>📅 Event Details</h2>
            @if($attendee->event)
                <div class="detail-row">
                    <span class="detail-label">Event:</span>
                    <span>{{ $attendee->event->title }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span>{{ $attendee->event->start_time->format('F j, Y') }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span>{{ $attendee->event->start_time->format('g:i A') }} - {{ Carbon::parse($attendee->event->end_time)->format('g:i A') }}</span>
                </div>
                @if($attendee->event->description)
                    <div class="detail-row">
                        <span class="detail-label">Details:</span>
                        <span>{{ $attendee->event->description }}</span>
                    </div>
                @endif
            @endif
            <div class="detail-row">
                <span class="detail-label">Attendee:</span>
                <span>{{ $attendee->name }} ({{ $attendee->email }})</span>
            </div>
        </div>

        <div class="qr-section">
            <div class="qr-title">📱 Your Entry QR Code</div>
            <p>Present this QR code at the event entrance for quick check-in:</p>

            @if($attendee->qr_code)
                <div class="qr-code">
                    <img src="{{ $attendee->qr_code['url'] ?? '' }}" alt="QR Code for {{ $attendee->name }}"/>
                </div>
            @endif

            <div class="qr-instructions">
                <strong>Instructions:</strong><br>
                • Save this email or take a screenshot of the QR code<br>
                • Present the QR code at the event entrance<br>
                • Make sure your screen brightness is sufficient for scanning<br>
                • Arrive 15 minutes early for smooth check-in
            </div>
        </div>

        <div class="important-note">
            <strong>Important:</strong> Please keep this email safe as it contains your unique entry code.
            If you lose access to this QR code, please contact our support team with your registration details.
        </div>

        <p>
            We look forward to seeing you at the event! If you have any questions or need assistance,
            please don't hesitate to contact us.
        </p>
    </div>

    <div class="footer">
        <p><strong>Event Registration System</strong></p>
        <p>This is an automated email. Please do not reply to this message.</p>
        <p>If you need assistance, please contact our support team.</p>
    </div>
</div>
</body>
</html>
