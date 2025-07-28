import Attendee from "@/Models/Attendee";

interface Event {
    id: number;
    title: string;
    start_time: string;
    end_time: string;
    description: string;
    attendees?: Attendee[];
}

export default Event;
