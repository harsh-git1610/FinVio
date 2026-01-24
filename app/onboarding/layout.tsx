import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "../utils/db";

export default async function OnboardingLayout({
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

    if (dbUser?.onboardingCompleted) {
        redirect("/dashboard");
    }

    return (
        <>
            {children}
        </>
    );
}
