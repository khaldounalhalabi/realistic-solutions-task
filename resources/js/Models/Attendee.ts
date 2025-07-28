import Event from "@/Models/Event";
import Media from "@/Models/Media";

interface Attendee {
    id: number;
    name: string;
    email: string;
    is_present: boolean;
    checked_in_at: string;
    event_id: number;
    qr_code?: Media | undefined;
    event?: Event;
}

export default Attendee;
