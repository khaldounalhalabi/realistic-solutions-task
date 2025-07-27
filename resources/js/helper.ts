import { MiddlewareProps } from "@/Types";
import { usePage } from "@inertiajs/react";

export const asset = (path: string) => {
    if (path.startsWith("/")) {
        path = path.replace("/", "");
    }

    return `${usePage<MiddlewareProps>().props.asset}${path}`;
};

export function getNestedPropertyValue(object: any, path: string): any {
    const properties = path.split(".");
    let value = object;
    for (const property of properties) {
        if (value?.hasOwnProperty(property)) {
            value = value[`${property}`];
        } else {
            return undefined;
        }
    }
    return value;
}

export const STR = {
    title: (str?: string) =>
        (str ?? "")
            .split(/([-_\s*])/g)
            .filter((s) => s.trim() != "-" && s.trim() != "_")
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join(" "),
};
