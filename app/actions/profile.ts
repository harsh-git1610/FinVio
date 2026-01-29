"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";

export async function uploadProfilePhoto(formData: FormData) {
    const { userId } = await auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    if (!file) {
        return { error: "No file provided" };
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
        return { error: "File must be an image" };
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        return { error: "File size must be less than 2MB" };
    }

    try {
        // Get user from database
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!dbUser) {
            return { error: "User not found" };
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Delete existing profile photo asset if it exists
        await prisma.asset.deleteMany({
            where: {
                userId: dbUser.id,
                type: "PROFILE_PHOTO",
            },
        });

        // Create new profile photo asset
        const asset = await prisma.asset.create({
            data: {
                userId: dbUser.id,
                type: "PROFILE_PHOTO",
                name: file.name,
                mimeType: file.type,
                base64: dataUrl,
            },
        });

        // Update user's profileImage field with the asset base64
        await prisma.user.update({
            where: { id: dbUser.id },
            data: { profileImage: dataUrl },
        });

        return { success: true, imageUrl: dataUrl };
    } catch (error) {
        console.error("Error uploading profile photo:", error);
        return { error: "Failed to upload photo" };
    }
}

export async function removeProfilePhoto() {
    const { userId } = await auth();

    if (!userId) {
        return { error: "Unauthorized" };
    }

    try {
        // Get user from database
        const dbUser = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!dbUser) {
            return { error: "User not found" };
        }

        // Delete profile photo asset
        await prisma.asset.deleteMany({
            where: {
                userId: dbUser.id,
                type: "PROFILE_PHOTO", 
            },
        });

        // Set profileImage to null
        await prisma.user.update({
            where: { id: dbUser.id },
            data: { profileImage: null },
        });

        return { success: true };
    } catch (error) {
        console.error("Error removing profile photo:", error);
        return { error: "Failed to remove photo" };
    }
}
