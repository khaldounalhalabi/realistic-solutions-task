import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/shadcn/sidebar";
import { SidebarItem } from "@/Components/ui/Sidebar";
import { Link } from "@inertiajs/react";

export function NavMain({ items }: { items: SidebarItem[] }) {
    const url = window.location.href;
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <Link href={item.href}>
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className={"cursor-pointer"}
                                    isActive={
                                        url !=
                                            route("v1.web.protected.index") &&
                                        (item.href.startsWith(url) ||
                                            item.href == url)
                                    }
                                >
                                    {item.icon &&
                                        (typeof item.icon == "function" ? (
                                            <item.icon />
                                        ) : (
                                            item.icon
                                        ))}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </Link>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
