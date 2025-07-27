import PresentationChart from "@/Components/Icons/PresentationChart";
import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/shadcn/sidebar";
import useUser from "@/Hooks/use-user";
import { Link } from "@inertiajs/react";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { SparkleIcon } from "lucide-react";
import React, { ReactNode } from "react";

export interface SidebarItem {
    href: string;
    title: string;
    icon?: ReactNode | (() => ReactNode);
}

const sidebarItems = [
    {
        href: route("v1.web.protected.index"),
        title: "Dashboard",
        icon: () => <PresentationChart />,
    },
    {
        title: "Events",
        href: route("v1.web.protected.events.index"),
        icon: () => <SparkleIcon />,
    },
];
export const Sidebar = ({
    ...props
}: React.ComponentProps<typeof ShadcnSidebar>) => {
    const { user } = useUser();
    return (
        <ShadcnSidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href={route("v1.web.protected.index")}>
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">
                                    Event Registration System
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarItems} />
            </SidebarContent>
            <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
        </ShadcnSidebar>
    );
};
