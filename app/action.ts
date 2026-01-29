"use server"

import { currentUser } from "@clerk/nextjs/server";
import { parseWithZod } from "@conform-to/zod"
import { onboardingSchema } from "./utils/zodSchema"
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function OnboardingUser(prevState: any, formData: FormData) {
    const user = await currentUser();

    if (!user) {
        return redirect("/login");
    }

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if (submission.status != "success") {
        return submission.reply();
    }

    // Get Google profile image URL
    const googleImageUrl = user.imageUrl || null;

    // Upsert user
    const dbUser = await prisma.user.upsert({
        where: {
            clerkId: user.id,
        },
        update: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
            businessName: submission.value.businessName,
            onboardingCompleted: true,
            profileImage: googleImageUrl,
        },
        create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
            businessName: submission.value.businessName,
            onboardingCompleted: true,
            profileImage: googleImageUrl,
        }
    });

    // If user has Google profile photo, create Asset entry for it
    if (googleImageUrl) {
        // Check if profile photo asset already exists
        const existingAsset = await prisma.asset.findFirst({
            where: {
                userId: dbUser.id,
                type: "PROFILE_PHOTO",
            },
        });

        // Only create if doesn't exist
        if (!existingAsset) {
            await prisma.asset.create({
                data: {
                    userId: dbUser.id,
                    type: "PROFILE_PHOTO",
                    name: "Google Profile Photo",
                    mimeType: "image/jpeg",
                    base64: googleImageUrl, // Store URL directly for Google photos
                },
            });
        }
    }

    return redirect("/dashboard");
}
