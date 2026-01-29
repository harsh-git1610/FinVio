import SidebarDemo from "@/components/sidebar-demo";
import { Topbar } from "@/components/topbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "../utils/db";


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
    });

    if (!dbUser?.onboardingCompleted) {
        redirect("/onboarding");
    }

    // Prepare user data for Topbar
    const userData = {
        firstName: dbUser.firstName || "",
        lastName: dbUser.lastName || "",
        email: dbUser.email || "",
        profileImage: dbUser.profileImage || null,
    };

    return (
        <div className="flex h-screen overflow-hidden bg-neutral-50 dark:bg-neutral-950">
            <div className="relative shrink-0">
                <SidebarDemo />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-neutral-800"></div>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar userData={userData} />
                <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                    {children}
                </main>
            </div>
        </div>
    );
}