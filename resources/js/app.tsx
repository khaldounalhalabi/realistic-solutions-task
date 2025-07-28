import AuthLayout from "@/Components/Layouts/AuthLayout";
import Layout from "@/Components/Layouts/Layout";
import { createInertiaApp } from "@inertiajs/react";
import { ReactElement, ReactNode, ReactPortal, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "../css/app.css";
import "./bootstrap";

const appName = import.meta.env.APP_NAME || "Laravel";

type PageType =
    | string
    | number
    | bigint
    | boolean
    | ReactElement
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<
          | string
          | number
          | bigint
          | boolean
          | ReactPortal
          | ReactElement
          | Iterable<ReactNode>
          | null
          | undefined
      >
    | null
    | undefined;

const authPages = [
    "Login",
    "ForgetPassword",
    "ResetPasswordCodeForm",
    "ResetPassword",
    "Register",
];

const notDashboardPages = ["Homepage"];

createInertiaApp({
    title: (title: any) => `${title} - ${appName}`,
    resolve: async (name: any) => {
        // @ts-ignore
        const pages = import.meta.glob("./Pages/**/*.tsx");
        // @ts-ignore
        let page = (await pages[`./Pages/${name}.tsx`]()).default;

        // Assign layout conditionally
        page.layout =
            page.layout ||
            (!authPages.includes(page.name ?? "undefined") &&
            !notDashboardPages.includes(page.name ?? "undefined")
                ? // @ts-ignore
                  (page: PageType) => <Layout children={page} />
                : authPages.includes(page.name ?? "undefined")
                  ? (page: PageType) => <AuthLayout children={page} />
                  : undefined);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Suspense fallback={<div>Loading...</div>}>
                <App {...props} />
            </Suspense>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
