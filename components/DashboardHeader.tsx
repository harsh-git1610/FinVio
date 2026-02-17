"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/animate-ui/components/radix/sidebar";
import { Separator } from "@/components/ui/separator";

export function DashboardHeader() {
    const pathname = usePathname();

    // Hide header on the invoice creation page
    if (pathname === "/dashboard/invoices/create" || pathname.startsWith("/dashboard/invoices/create/")) {
        return null;
    }

    return (
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
        </header>
    );
}
