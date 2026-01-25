import z from "zod";
import { invoiceItemSchema } from "./zodSchema";

// Draft Invoice Schema - Lenient validation
export const draftInvoiceSchema = z.object({
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    date: z.date({ required_error: "Date is required" }),
    dueDate: z.date().optional(),
    currency: z.enum(["USD", "EUR", "GBP", "INR"]).optional(),
    fromName: z.string().optional(),
    fromEmail: z.string().optional(),
    fromAddress: z.string().optional(),
    toName: z.string().optional(),
    toEmail: z.string().optional(),
    toAddress: z.string().optional(),
    items: z.array(invoiceItemSchema).optional(),
    taxRate: z.number().optional(),
    taxName: z.string().optional(),
    discount: z.number().optional(),
    notes: z.string().optional(),
    userId: z.string().cuid().optional(),
    companyLogo: z.string().optional(),
    signature: z.string().optional(),
});
