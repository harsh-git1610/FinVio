import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "../../../components/profile-form";

export default async function SettingsPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!dbUser) {
        redirect("/login");
    }

    // Prepare user data
    const userData = {
        firstName: dbUser.firstName || "",
        lastName: dbUser.lastName || "",
        email: dbUser.email || "",
        profileImage: dbUser.profileImage || null,
        // Business data not needed for profile
    };

    return <ProfileForm userData={userData} />;
}

