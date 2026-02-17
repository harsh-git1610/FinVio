import { z } from "zod";

// Onboarding Schema
export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First Name is Required"),
    lastName: z.string().min(2, "Last Name is Required"),
    businessName: z.string().min(2, "Business Name is Required"),
    address: z.string().min(2, "Address is Required"),
});

// Invoice Item Schema
export const invoiceItemSchema = z.object({
    id: z.string(),
    description: z.string().min(1, "Item description is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    price: z.number().min(0, "Price must be positive"),
});

// Helper to handle duplicate inputs (arrays) from FormData
const singleString = (message?: string) => z.preprocess(
    (val) => Array.isArray(val) ? val[val.length - 1] : val,
    z.string().min(1, message)
);

const optionalString = z.preprocess(
    (val) => Array.isArray(val) ? val[val.length - 1] : val,
    z.string().optional()
);

const singleNumber = (message?: string) => z.preprocess(
    (val) => {
        const v = Array.isArray(val) ? val[val.length - 1] : val;
        return Number(v);
    },
    z.number().min(0, message)
);

const optionalNumber = z.preprocess(
    (val) => {
        if (!val) return undefined;
        const v = Array.isArray(val) ? val[val.length - 1] : val;
        return Number(v);
    },
    z.number().optional()
);

// Invoice Schema with User Relation
export const createInvoiceSchema = z.object({
    // Invoice Header
    invoiceNumber: singleString("Invoice number is required"),
    date: z.coerce.date({
        required_error: "Invoice date is required",
    }),
    dueDate: z.coerce.date({
        required_error: "Due date is required",
    }).optional(),
    currency: z.preprocess(
        (val) => Array.isArray(val) ? val[val.length - 1] : val,
        z.enum(["USD", "EUR", "GBP", "INR"], {
            required_error: "Currency is required",
        })
    ),

    // From (Sender/Business)
    fromName: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().min(2, "Your name/business name is required")),
    fromEmail: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().email("Valid email is required")),
    fromAddress: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().min(5, "Your address is required")),

    // To (Client/Recipient)
    toName: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().min(2, "Client name is required")),
    toEmail: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().email("Valid client email is required")),
    toAddress: z.preprocess((val) => Array.isArray(val) ? val[val.length - 1] : val, z.string().min(5, "Client address is required")),

    // Line Items
    items: z.string().transform((str, ctx): z.infer<typeof invoiceItemSchema>[] => {
        try {
            const parsed = JSON.parse(str);
            const result = z.array(invoiceItemSchema).safeParse(parsed);
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    ctx.addIssue(issue);
                });
                return [];
            }
            return result.data;
        } catch (e) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid items data" });
            return [];
        }
    }).refine((items) => items.length > 0, { message: "At least one item is required" }),

    // Tax and Notes
    taxRate: singleNumber("Tax rate must be at least 0%"),
    taxName: singleString("Tax name is required"),
    discount: z.preprocess(
        (val) => {
            const v = Array.isArray(val) ? val[val.length - 1] : val;
            return Number(v);
        },
        z.number().min(0, "Discount must be at least 0%").max(100, "Discount cannot exceed 100%").default(0)
    ),
    notes: optionalString,

    // User Relation (for backend)
    userId: z.string().cuid().optional(),

    // Asset References (Base64)
    companyLogo: optionalString,
    signature: optionalString,

    template: z.string().optional(),
    color: z.string().optional(),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;

export const draftInvoiceSchema = z.object({
    invoiceNumber: singleString("Invoice number is required"),
    date: z.coerce.date({ required_error: "Date is required" }),
    dueDate: z.coerce.date().optional(),
    currency: z.preprocess(
        (val) => Array.isArray(val) ? val[val.length - 1] : val,
        z.enum(["USD", "EUR", "GBP", "INR"]).optional()
    ),
    fromName: optionalString,
    fromEmail: optionalString,
    fromAddress: optionalString,
    toName: optionalString,
    toEmail: optionalString,
    toAddress: optionalString,
    items: z.string().optional().transform((str, ctx): z.infer<typeof invoiceItemSchema>[] | undefined => {
        if (!str) return undefined;
        try {
            const parsed = JSON.parse(str);
            return z.array(invoiceItemSchema).parse(parsed);
        } catch (e) {
            return [];
        }
    }),
    taxRate: optionalNumber,
    taxName: optionalString,
    discount: optionalNumber,
    notes: optionalString,
    userId: z.string().optional(),
    companyLogo: optionalString,
    signature: optionalString,
    template: z.string().optional(),
    color: z.string().optional(),
});

export const updateProfileSchema = z.object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2, "Last Name is required"),
    email: z.string().email("Valid email is required"),
});

export const updateBusinessSchema = z.object({
    businessName: z.string().min(2, "Business Name is required"),
    address: z.string().min(5, "Address is required"),
});

export const updateInvoiceDefaultsSchema = z.object({
    defaultCurrency: z.string().min(1, "Currency is required"),
    defaultTaxRate: z.preprocess((val) => Number(val), z.number().min(0)),
    defaultNotes: z.string().optional(),
});
