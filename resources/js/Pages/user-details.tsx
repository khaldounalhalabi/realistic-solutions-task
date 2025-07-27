import Input from "@/Components/Form/Fields/Input";
import Form from "@/Components/Form/Form";
import PageCard from "@/Components/ui/PageCard";
import Tabs from "@/Components/ui/Tabs";
import User from "@/Models/User";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const UserDetails = ({ user }: { user: User }) => {
    return (
        <PageCard>
            <Tabs
                tabs={[
                    {
                        title: "Overview",
                        render: <UserOverview user={user} />,
                    },
                    {
                        title: "Edit your profile",
                        render: <EditProfile user={user} />,
                    },
                ]}
            />
        </PageCard>
    );
};

export default UserDetails;

const UserOverview = ({ user }: { user: User }) => {
    return (
        <div className="w-full p-8">
            <h2 className="text-xl font-semibold ">Profile details</h2>
            <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="flex justify-between items-center ">
                    <strong>Full name :</strong>
                    <p>
                        {user.first_name} {user.last_name}
                    </p>
                </label>

                <label className="flex justify-between items-center ">
                    <strong>Email :</strong>
                    <p>{user.email}</p>
                </label>
            </div>
        </div>
    );
};

const EditProfile = ({ user }: { user: User }) => {
    const { post, setData, processing } = useForm<{
        first_name?: string;
        last_name?: string;
        email?: string;
        password?: string;
        password_confirmation?: string;
        _method: "POST" | "PUT";
    }>({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        _method: "PUT",
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.protected.me.update"));
    };

    return (
        <div className="w-full p-8">
            <h2 className="text-xl font-semibold">Edit Profile :</h2>
            <Form
                onSubmit={onSubmit}
                processing={processing}
                backButton={false}
            >
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 my-5">
                    <Input
                        name="first_name"
                        type="text"
                        label={"First name"}
                        onChange={(e) => {
                            setData("first_name", e.target.value);
                        }}
                        defaultValue={user?.first_name}
                        className={"max-w-md"}
                    />

                    <Input
                        name="last_name"
                        type="text"
                        label={"Last name"}
                        onChange={(e) => {
                            setData("last_name", e.target.value);
                        }}
                        defaultValue={user?.last_name}
                        className={"max-w-md"}
                    />

                    <Input
                        name="email"
                        type="email"
                        label={"Email"}
                        onChange={(e) => {
                            setData("email", e.target.value);
                        }}
                        defaultValue={user?.email}
                        className={"max-w-md"}
                    />

                    <Input
                        name="password"
                        label={"New password"}
                        type="password"
                        onChange={(e) => {
                            setData("password", e.target.value);
                        }}
                        autoComplete={"new-password"}
                        className={"max-w-md"}
                    />

                    <Input
                        name="password_confirmation"
                        label={"Confirm password"}
                        type="password"
                        onChange={(e) => {
                            setData("password_confirmation", e.target.value);
                        }}
                        autoComplete={"new-password"}
                        className={"max-w-md"}
                    />
                </div>
            </Form>
        </div>
    );
};
