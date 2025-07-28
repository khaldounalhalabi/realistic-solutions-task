import Input from "@/Components/Form/Fields/Input";
import ApiSelect from "@/Components/Form/Fields/Select/ApiSelect";
import Form from "@/Components/Form/Form";
import PageCard from "@/Components/ui/PageCard";
import Attendee from "@/Models/Attendee";
import Event from "@/Models/Event";
import Http from "@/Modules/Http/Http";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Edit = ({ attendee }: { attendee: Attendee }) => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        name: string;
        email: string;
        checked_in_at: string;
        event_id: number;
    }>({
        _method: "PUT",
        name: attendee?.name,
        email: attendee?.email,
        checked_in_at: attendee?.checked_in_at,
        event_id: attendee?.event_id,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.attendees.update", attendee.id));
    };

    return (
        <PageCard title="Edit Attendee">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="name"
                        label={"Name"}
                        type={"text"}
                        onChange={(e) => setData("name", e.target?.value)}
                        defaultValue={attendee.name}
                        required
                    />
                    <Input
                        name="email"
                        label={"Email"}
                        type={"email"}
                        onChange={(e) => setData("email", e.target?.value)}
                        defaultValue={attendee.email}
                        required
                    />
                    <Input
                        name="checked_in_at"
                        label={"Checked In At"}
                        type={"datetime-local"}
                        onChange={(e) =>
                            setData(
                                "checked_in_at",
                                e.target?.value?.replace("T", " "),
                            )
                        }
                        defaultValue={attendee.checked_in_at}
                    />
                    <ApiSelect
                        name="event_id"
                        label={"Event"}
                        api={(page, search) =>
                            Http.make<Event[]>().get(
                                route("v1.web.protected.events.data"),
                                { page: page, search: search, is_active: true },
                            )
                        }
                        getDataArray={(response) => response?.data ?? []}
                        getIsLast={(data) =>
                            data?.paginate?.is_last_page ?? false
                        }
                        getTotalPages={(data) =>
                            data?.paginate?.total_pages ?? 0
                        }
                        onChange={(e) =>
                            setData(
                                "event_id",
                                e.target.value ? Number(e.target.value) : 0,
                            )
                        }
                        optionLabel={"title"}
                        optionValue={"id"}
                        defaultValue={attendee?.event}
                        required
                    />
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
