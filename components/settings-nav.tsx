"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsNav() {
    const pathname = usePathname();

    let activeTab = "profile";
    if (pathname.includes("/business")) {
        activeTab = "business";
    } else if (pathname.includes("/security")) {
        activeTab = "security";
    }

    return (
        <Tabs value={activeTab} className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
                <Link href="/dashboard/settings">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                </Link>
                <Link href="/dashboard/settings/business">
                    <TabsTrigger value="business">Business</TabsTrigger>
                </Link>
                <Link href="/dashboard/settings/security">
                    <TabsTrigger value="security">Security</TabsTrigger>
                </Link>
            </TabsList>
        </Tabs>
    );
}
