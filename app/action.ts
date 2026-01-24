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

    await prisma.user.upsert({
        where: {
            clerkId: user.id,
        },
        update: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
            businessName: submission.value.businessName,
            onboardingCompleted: true,
        },
        create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
            businessName: submission.value.businessName,
            onboardingCompleted: true,
        }
    })
    return redirect("/dashboard")

}
