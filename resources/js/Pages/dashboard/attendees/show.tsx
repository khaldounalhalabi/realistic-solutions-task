import SmallTextField from "@/Components/Show/SmallTextField";
import PageCard from "@/Components/ui/PageCard";
import { Button } from "@/Components/ui/shadcn/button";
import Attendee from "@/Models/Attendee";
import { Link } from "@inertiajs/react";

const Show = ({ attendee }: { attendee: Attendee }) => {
    return (
        <PageCard
            title="Attendee Details"
            actions={
                <div className="flex justify-between items-center">
                    <Link
                        href={route(
                            "v1.web.protected.attendees.edit",
                            attendee.id,
                        )}
                    >
                        <Button>Edit</Button>
                    </Link>
                </div>
            }
        >
            <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                <SmallTextField label="Name" value={attendee.name} />
                <SmallTextField label="Email" value={attendee.email} />
                <SmallTextField
                    label="Is Present ?"
                    value={attendee.is_present ? "Yes" : "No"}
                />
                <SmallTextField
                    label="Checked In At"
                    value={attendee.checked_in_at}
                />
                <SmallTextField label="Event" value={attendee?.event?.title} />
                <div className={"md:col-span-2 flex items-center justify-center"}>
                    <img src={attendee.qr_code?.url} />
                </div>
            </div>
        </PageCard>
    );
};

export default Show;
