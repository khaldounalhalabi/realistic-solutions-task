import Input from "@/Components/Form/Fields/Input";
import ApiSelect from "@/Components/Form/Fields/Select/ApiSelect";
import LoadingSpinner from "@/Components/Icons/LoadingSpinner";
import { LabelValue } from "@/Components/ui/labels-and-values/LabelValue";
import { Button } from "@/Components/ui/shadcn/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/Components/ui/shadcn/hover-card";
import Event from "@/Models/Event";
import HTTP from "@/Modules/Http/Http";
import { MiddlewareProps } from "@/Types";
import { useForm, usePage } from "@inertiajs/react";
import { CheckCircle } from "lucide-react";
import React from "react";
import { toast, Toaster } from "sonner";

const Homepage = () => {
    const { setData, processing, post, reset, data } = useForm<{
        name: string;
        email: string;
        event_id: number;
    }>();

    if (usePage<MiddlewareProps>().props.message) {
        toast.info(usePage<MiddlewareProps>().props.message);
        usePage<MiddlewareProps>().props.message = undefined;
    }

    if (usePage<MiddlewareProps>().props.success) {
        toast.success(usePage<MiddlewareProps>().props.success);
        usePage<MiddlewareProps>().props.success = undefined;
    }

    if (usePage<MiddlewareProps>().props.error) {
        toast.error(usePage<MiddlewareProps>().props.error);
        usePage<MiddlewareProps>().props.success = undefined;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("v1.web.public.attendees.register"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <Toaster />
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Event Registration
                    </h1>
                    <p className="text-gray-600">
                        Register for upcoming events and stay connected with our
                        community
                    </p>
                </div>

                <Card className="shadow-lg border-0">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            Register for Event
                        </CardTitle>
                        <CardDescription>
                            Fill out the form below to secure your spot at the
                            event
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Enter your full name"
                                    name="name"
                                    required
                                    label="Full Name"
                                    value={data.name}
                                />
                            </div>

                            <div className="space-y-2">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="Email Address"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Enter your email address"
                                    required
                                    value={data.email}
                                />
                            </div>

                            <div className="space-y-2">
                                <ApiSelect
                                    name="event_id"
                                    label={"Event"}
                                    api={(page, search) =>
                                        HTTP.make<Event[]>().get(
                                            route(
                                                "v1.web.public.active.events",
                                            ),
                                            {
                                                page: page,
                                                search: search,
                                                is_active: true,
                                            },
                                        )
                                    }
                                    getDataArray={(response) =>
                                        response?.data ?? []
                                    }
                                    getIsLast={(data) =>
                                        data?.paginate?.is_last_page ?? false
                                    }
                                    getTotalPages={(data) =>
                                        data?.paginate?.total_pages ?? 0
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "event_id",
                                            e.target.value
                                                ? Number(e.target.value)
                                                : 0,
                                        )
                                    }
                                    optionValue={"id"}
                                    getOptionLabel={(item) => (
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button
                                                    variant={"ghost"}
                                                    className={
                                                        "w-full h-full text-start justify-start"
                                                    }
                                                    size={"sm"}
                                                    type={"button"}
                                                >
                                                    {item.title}
                                                </Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <CardHeader className={"p-0"}>
                                                    <CardTitle>
                                                        {item.title}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {item.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent className={"p-0"}>
                                                    <LabelValue
                                                        label={"From"}
                                                        value={item.start_time}
                                                    />
                                                    <LabelValue
                                                        label={"To"}
                                                        value={item.end_time}
                                                    />
                                                </CardContent>
                                            </HoverCardContent>
                                        </HoverCard>
                                    )}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Register for event{" "}
                                {processing && <LoadingSpinner />}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>© 2024 EventHub. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
