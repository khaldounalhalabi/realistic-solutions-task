import { IconCirclePlusFilled } from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/shadcn/sidebar";
import { SidebarItem } from "@/Components/ui/Sidebar";

export function NavMain({ items }: { items: SidebarItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon &&
                                    (typeof item.icon == "function" ? (
                                        <item.icon />
                                    ) : (
                                        item.icon
                                    ))}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
