import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Fields/Input";
import TextEditor from "@/Components/Form/Fields/TextEditor";
import PageCard from "@/Components/ui/PageCard";
import { useForm } from "@inertiajs/react";
import { ChangeEvent, FormEvent } from "react";

const Create = () => {
    const { post, setData, processing } = useForm<{
        _method?: "PUT" | "POST";
        title: string;
        start_time: string;
        end_time: string;
        description: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.events.store"));
    };

    return (
        <PageCard title="Add New Event">
            <Form onSubmit={onSubmit} processing={processing}>
                <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-start`}
                >
                    <Input
                        name="title"
                        label={"Title"}
                        type={"text"}
                        onChange={(e) => setData("title", e.target?.value)}
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
                        required
                    />
                    <div className="md:col-span-2">
                        <TextEditor
                            name="description"
                            label={"Description"}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setData("description", e.target.value)
                            }
                            required
                        />
                    </div>
                </div>
            </Form>
        </PageCard>
    );
};

export default Create;
