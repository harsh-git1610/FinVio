'use server'

import { prisma } from "@/app/utils/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { getOrCreateDbUser } from "@/app/utils/getDbusers"

/**
 * Upload Asset
 */
export async function uploadAsset(formData: FormData) {
    const { userId: clerkId } = await auth()

    if (!clerkId) {
        return { error: "Not authenticated" }
    }

    const dbUser = await getOrCreateDbUser(clerkId)
    if (!dbUser) {
        return { error: "User not found" }
    }

    const file = formData.get("file") as File | null
    const type = formData.get("type") as "LOGO" | "SIGNATURE" | null

    if (!file) return { error: "No file provided" }
    if (!type || !["LOGO", "SIGNATURE"].includes(type)) {
        return { error: "Invalid asset type" }
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    await prisma.asset.create({
        data: {
            userId: dbUser.id,
            type,
            name: file.name,
            mimeType: file.type,
            base64,
        },
    })

    revalidatePath("/dashboard/assets")
    return { success: true }
}

/**
 * Get assets
 */
export async function getAssets() {
    const { userId: clerkId } = await auth()
    if (!clerkId) return []

    const dbUser = await getOrCreateDbUser(clerkId)
    if (!dbUser) return []

    return prisma.asset.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: "desc" },
    })
}

/**
 * Delete asset
 */
export async function deleteAsset(assetId: string) {
    const { userId: clerkId } = await auth()
    if (!clerkId) return { error: "Not authenticated" }

    const dbUser = await getOrCreateDbUser(clerkId)
    if (!dbUser) return { error: "User not found" }

    const asset = await prisma.asset.findFirst({
        where: {
            id: assetId,
            userId: dbUser.id,
        },
    })

    if (!asset) {
        return { error: "Asset not found or unauthorized" }
    }

    await prisma.asset.delete({
        where: { id: assetId },
    })

    revalidatePath("/dashboard/assets")
    return { success: true }
}
