"use client";

import { useEffect, useRef } from "react";
import { getInvoiceTemplate } from "@/app/dashboard/invoices/templates/templates";
import { Invoice } from "@prisma/client";

interface LivePreviewProps {
    data: any; // We'll accept the form data here
    template: string;
    color: string;
}

export default function LivePreview({ data, template, color }: LivePreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Construct a mock invoice object from the form data
    // We need to ensure it matches the Invoice type expected by getInvoiceTemplate
    // as much as possible for the preview to work.
    const mockInvoice = {
        id: "preview",
        invoiceNumber: data.invoiceNumber || "",
        date: data.date || new Date(),
        dueDate: data.dueDate || new Date(),
        fromName: data.fromName || "",
        fromEmail: data.fromEmail || "",
        fromAddress: data.fromAddress || "",
        toName: data.toName || "",
        toEmail: data.toEmail || "",
        toAddress: data.toAddress || "",
        currency: data.currency || "USD",
        items: data.items || [],
        taxRate: data.taxRate || 0,
        taxName: data.taxName || "Tax",
        discount: data.discount || 0,
        notes: data.notes || "",
        companyLogo: data.companyLogo || "",
        signature: data.signature || "",
        template: template || "clean",
        color: color || "#000000",
        status: "DRAFT",
        userId: "preview",
        createdAt: new Date(),
        updatedAt: new Date(),
        total: 0, // Calculated in template usually, but safe to default
    } as unknown as Invoice;

    useEffect(() => {
        if (iframeRef.current) {
            const doc = iframeRef.current.contentDocument;
            if (doc) {
                const html = getInvoiceTemplate(mockInvoice);
                doc.open();
                doc.write(html);

                // Inject style request to hide scrollbar
                const style = doc.createElement('style');
                style.textContent = `
                    ::-webkit-scrollbar { display: none; }
                    html { -ms-overflow-style: none; scrollbar-width: none; }
                `;
                doc.head.appendChild(style);

                doc.close();
            }
        }
    }, [data, template, color]);

    return (
        <div className="w-full h-full border rounded-lg overflow-hidden bg-white shadow-sm overflow-y-scroll scrollbar-hide">
            <iframe
                ref={iframeRef}
                title="Invoice Preview"
                className="w-full h-full min-h-[800px] border-none "
                sandbox="allow-same-origin"
            />
        </div>
    );
}
