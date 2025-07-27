import Form from "@/Components/Form/Form";
import Input from "@/Components/Form/Fields/Input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/shadcn/card";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const ResetPasswordCodeForm = () => {
    const { post, setData, processing, data } = useForm<{
        reset_password_code: string;
    }>();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("v1.web.public.validate.reset.password.code"), {
            onSuccess: () => {
                window.localStorage.setItem(
                    "password_reset_code",
                    data?.reset_password_code,
                );
            },
        });
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Check your email for an email from us</CardTitle>
                <CardDescription>Enter the code you received on your email</CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    backButton={false}
                    buttonText={"Confirm"}
                    onSubmit={onSubmit}
                    processing={processing}
                >
                    <Input
                        label={"Password reset code"}
                        name={"reset_password_code"}
                        required={true}
                        onChange={(e) => {
                            setData("reset_password_code", e.target.value);
                        }}
                        type="text"
                        placeholder={"code ...."}
                    />
                </Form>
            </CardContent>
        </Card>
    );
};

export default ResetPasswordCodeForm;
