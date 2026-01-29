import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/settings-form";

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
        businessName: dbUser.businessName || "",
        address: dbUser.address || "",
        profileImage: dbUser.profileImage || null,
        defaultCurrency: dbUser.defaultCurrency || "USD",
        defaultTaxRate: dbUser.defaultTaxRate || 0,
        defaultNotes: dbUser.defaultNotes || "",
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your account settings and preferences."
            />

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="business">Business</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>

                <SettingsForm userData={userData} />
            </Tabs>
        </div>
    );
}

