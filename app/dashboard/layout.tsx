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

    let dbUser;
    try {
        dbUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            },
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-neutral-50 px-4 text-center dark:bg-neutral-950">
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6 text-red-600 dark:text-red-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                    </svg>
                </div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                    Database Connection Timeout
                </h1>
                <p className="max-w-md text-sm text-neutral-500 dark:text-neutral-400">
                    We couldn't reach the database. This usually happens when the
                    database is waking up from inactivity. Please refresh the
                    page in a few seconds.
                </p>
                <a
                    href="/dashboard"
                    className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-800"
                >
                    Retry Connection
                </a>
            </div>
        );
    }

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