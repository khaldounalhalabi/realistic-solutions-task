import { Label } from "@/Components/ui/shadcn/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/shadcn/radio-group";
import { usePage } from "@inertiajs/react";
import React from "react";

interface IRadioProps {
    name: string;
    items: { label?: string; value: string | number }[];
    checked?: ((value: string | number) => boolean) | string;
    onChange?: (e: string | number) => void;
    label?: string;
}

const Radio: React.FC<IRadioProps> = ({
    name,
    items = [],
    checked = undefined,
    onChange = undefined,
    label = undefined,
}) => {
    const errors = usePage().props.errors;
    const error = name && errors[name] ? errors[name] : undefined;
    const defaultValue = checked
        ? typeof checked == "function"
            ? items?.filter((i) => checked(i.value))?.[0].value
            : checked
        : undefined;

    return (
        <Label
            htmlFor={`${name}_${label}_id`}
            className={"flex flex-col items-start justify-between"}
        >
            {label ?? ""}
            <RadioGroup
                onValueChange={onChange}
                defaultValue={defaultValue?.toString()}
                className={"flex flex-row items-center gap-2 flex-wrap"}
                id={`${name}_${label}_id`}
            >
                {items.map((i) => (
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={i.value?.toString()}
                            id={i.label + "_" + i.value + "_" + "_id"}
                        />
                        <Label htmlFor={i.label + "_" + i.value + "_" + "_id"}>
                            {i.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
            {error ? <p className={"text-sm text-destructive"}>{error}</p> : ""}
        </Label>
    );
};

export default Radio;
