import Input from "@/Components/Form/Fields/Input";
import Form from "@/Components/Form/Form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import { Link, useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const Login = () => {
    const { post, setData, processing } = useForm<{
        email: string;
        password: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("v1.web.public.login"));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{"Welcome back"}</CardTitle>
                <CardDescription>
                    {"Enter your email and password to login to your account."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    processing={processing}
                    buttonText={"Login"}
                    backButton={false}
                >
                    <div className="flex flex-col gap-6">
                        <Input
                            name="email"
                            onChange={(e) => setData("email", e.target.value)}
                            label={"Email"}
                            required={true}
                            type="email"
                            placeholder={"john@email.com"}
                        />

                        <Input
                            name="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            label={"Password"}
                            required={true}
                            type="password"
                            placeholder={"password"}
                        />
                        <p className={"text-primary"}>
                            <span>Forgot your password ?</span>
                            <Link
                                href={route(
                                    "v1.web.public.request.reset.password.page",
                                )}
                                className="font-bold text-sm underline-offset-4 hover:underline"
                            >
                                Reset your password
                            </Link>
                        </p>
                    </div>
                </Form>
            </CardContent>
        </Card>
    );
};

export default Login;
