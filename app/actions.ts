"use server";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";
import { createInvoiceSchema, draftInvoiceSchema } from "@/app/utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createInvoice(prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in to create an invoice"],
            },
        };
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        return {
            status: "error" as const,
            error: {
                "": ["User not found in database"],
            },
        };
    }

    const action = formData.get("action");
    const isDraft = action === "save-draft";

    // Select the appropriate schema
    const schema = isDraft ? draftInvoiceSchema : createInvoiceSchema;

    const submission = parseWithZod(formData, {
        schema: schema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.invoice.create({
        data: {
            invoiceNumber: data.invoiceNumber,
            date: data.date,
            dueDate: data.dueDate ?? data.date,
            currency: data.currency ?? "USD",
            fromName: data.fromName ?? "",
            fromEmail: data.fromEmail ?? "",
            fromAddress: data.fromAddress ?? "",
            toName: data.toName ?? "",
            toEmail: data.toEmail ?? "",
            toAddress: data.toAddress ?? "",
            items: (data.items ?? []) as any,
            taxRate: data.taxRate ?? 0,
            taxName: data.taxName ?? "Tax",
            discount: data.discount ?? 0,
            notes: data.notes ?? "",
            userId: user.id,
            companyLogo: data.companyLogo ?? "",
            signature: data.signature ?? "",
            status: (isDraft ? "DRAFT" : "PENDING") as any,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function editInvoice(invoiceId: string, prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in to edit an invoice"],
            },
        };
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        return {
            status: "error" as const,
            error: {
                "": ["User not found in database"],
            },
        };
    }

    const action = formData.get("action");
    const isDraft = action === "save-draft";

    // Select the appropriate schema
    const schema = isDraft ? draftInvoiceSchema : createInvoiceSchema;

    const submission = parseWithZod(formData, {
        schema: schema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: user.id
        },
        data: {
            invoiceNumber: data.invoiceNumber,
            date: data.date,
            dueDate: data.dueDate ?? data.date,
            currency: data.currency ?? "USD",
            fromName: data.fromName ?? "",
            fromEmail: data.fromEmail ?? "",
            fromAddress: data.fromAddress ?? "",
            toName: data.toName ?? "",
            toEmail: data.toEmail ?? "",
            toAddress: data.toAddress ?? "",
            items: (data.items ?? []) as any,
            taxRate: data.taxRate ?? 0,
            taxName: data.taxName ?? "Tax",
            discount: data.discount ?? 0,
            notes: data.notes ?? "",
            companyLogo: data.companyLogo ?? "",
            signature: data.signature ?? "",
            status: (isDraft ? "DRAFT" : "PENDING") as any,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        return redirect("/login");
    }

    await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: user.id,
        },
    });

    revalidatePath("/dashboard/invoices");
}

export async function markAsPaid(invoiceId: string) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        return redirect("/login");
    }

    await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: user.id
        },
        data: {
            status: "PAID",
        }
    })

    revalidatePath("/dashboard/invoices");
}
