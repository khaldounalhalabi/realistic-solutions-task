import LongTextField from "@/Components/Show/LongTextField";
import SmallTextField from "@/Components/Show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Event from "@/Models/Event";
import { Link } from "@inertiajs/react";

const Show = ({ event }: { event: Event }) => {
    return (
        <PageCard
            title="Event Details"
            actions={
                <div className="flex justify-between items-center">
                    <Link
                        href={route("v1.web.protected.events.edit", event.id)}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                <SmallTextField label="Title" value={event.title} />
                <SmallTextField label="Start Time" value={event.start_time} />
                <SmallTextField label="End Time" value={event.end_time} />
            </div>

            <LongTextField label="Description" value={event.description} />
        </PageCard>
    );
};

export default Show;
