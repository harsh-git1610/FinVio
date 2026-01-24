import SidebarDemo from "@/components/sidebar-demo";
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

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-neutral-900">
            <div className="relative shrink-0">
                <SidebarDemo />
                <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent dark:via-gray-800"></div>
            </div>
            <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                {children}
            </main>
        </div>
    );
}