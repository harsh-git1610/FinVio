"use server";

import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";
import { createInvoiceSchema, draftInvoiceSchema, updateProfileSchema, updateBusinessSchema, updateInvoiceDefaultsSchema } from "@/app/utils/zodSchema";
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

    // Calculate total from items
    const items = (data.items ?? []) as Array<{ quantity: number; price: number }>;
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = subtotal * ((data.taxRate ?? 0) / 100);
    const discountAmount = (data.discount ?? 0);
    const total = subtotal + taxAmount - discountAmount;

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
            items: items as any,
            taxRate: data.taxRate ?? 0,
            taxName: data.taxName ?? "Tax",
            discount: data.discount ?? 0,
            total: total,
            notes: data.notes ?? "",
            userId: user.id,
            companyLogo: data.companyLogo ?? "",
            signature: data.signature ?? "",
            template: data.template ?? "clean",
            color: data.color ?? "#000000",
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

    // Calculate total from items
    const items = (data.items ?? []) as Array<{ quantity: number; price: number }>;
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = subtotal * ((data.taxRate ?? 0) / 100);
    const discountAmount = (data.discount ?? 0);
    const total = subtotal + taxAmount - discountAmount;

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
            items: items as any,
            taxRate: data.taxRate ?? 0,
            taxName: data.taxName ?? "Tax",
            discount: data.discount ?? 0,
            total: total,
            notes: data.notes ?? "",
            companyLogo: data.companyLogo ?? "",
            signature: data.signature ?? "",
            template: data.template ?? "clean",
            color: data.color ?? "#000000",
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

export async function updateProfile(prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in"],
            },
        };
    }

    const submission = parseWithZod(formData, {
        schema: updateProfileSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.user.update({
        where: { clerkId: userId },
        data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        },
    });

    revalidatePath("/dashboard/settings");

    return {
        status: "success" as const,
    };
}

export async function updateBusiness(prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in"],
            },
        };
    }

    const submission = parseWithZod(formData, {
        schema: updateBusinessSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.user.update({
        where: { clerkId: userId },
        data: {
            businessName: data.businessName,
            address: data.address,
        },
    });

    revalidatePath("/dashboard/settings");

    return {
        status: "success" as const,
    };
}

export async function updateInvoiceDefaults(prevState: unknown, formData: FormData) {
    const { userId } = await clerkAuth();

    if (!userId) {
        return {
            status: "error" as const,
            error: {
                "": ["You must be logged in"],
            },
        };
    }

    const submission = parseWithZod(formData, {
        schema: updateInvoiceDefaultsSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = submission.value;

    await prisma.user.update({
        where: { clerkId: userId },
        data: {
            defaultCurrency: data.defaultCurrency,
            defaultTaxRate: data.defaultTaxRate,
            defaultNotes: data.defaultNotes,
        },
    });

    revalidatePath("/dashboard/settings");

    return {
        status: "success" as const,
    };
}
