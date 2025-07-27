import Input from "@/Components/Form/Fields/Input";
import TextEditor from "@/Components/Form/Fields/TextEditor";
import Form from "@/Components/Form/Form";
import PageCard from "@/Components/ui/PageCard";
import Event from "@/Models/Event";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";

const Edit = ({ event }: { event: Event }) => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        title: string;
        start_time: string;
        end_time: string;
        description: string;
    }>({
        _method: "PUT",
        title: event?.title,
        start_time: event?.start_time,
        end_time: event?.end_time,
        description: event?.description,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.protected.events.update", event.id));
    };

    return (
        <PageCard title="Edit Event">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="title"
                        label={"Title"}
                        type={"text"}
                        onChange={(e) => setData("title", e.target?.value)}
                        defaultValue={event.title}
                        required
                    />
                    <Input
                        name="start_time"
                        label={"Start Time"}
                        type={"datetime-local"}
                        onChange={(e) =>
                            setData(
                                "start_time",
                                e.target?.value?.replace("T", " "),
                            )
                        }
                        defaultValue={event.start_time}
                        required
                    />
                    <Input
                        name="end_time"
                        label={"End Time"}
                        type={"datetime-local"}
                        onChange={(e) =>
                            setData(
                                "end_time",
                                e.target?.value?.replace("T", " "),
                            )
                        }
                        defaultValue={event.end_time}
                        required
                    />
                    <div className="md:col-span-2">
                        <TextEditor
                            name="description"
                            label={"Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("description", e.target.value)
                            }
                            defaultValue={event.description}
                            required
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Edit;
