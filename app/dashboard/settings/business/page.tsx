
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BusinessForm } from "../../../../components/business-form";

export default async function BusinessSettingsPage() {
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
        businessName: dbUser.businessName || "",
        address: dbUser.address || "",
        defaultCurrency: dbUser.defaultCurrency || "USD",
        defaultTaxRate: dbUser.defaultTaxRate || 0,
        defaultNotes: dbUser.defaultNotes || "",
    };

    return <BusinessForm userData={userData} />;
}