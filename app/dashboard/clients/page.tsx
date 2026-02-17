import { PageHeader } from "@/components/ui/page-header";
import { Toolbar } from "@/components/ui/toolbar";
import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ClientList } from "./client-list";
import { Invoice } from "@prisma/client";

export default async function ClientsPage() {
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

    // Get all invoices with full data
    const invoices = await prisma.invoice.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' }
    });

    // Group by client email
    const clientsMap = new Map<string, {
        name: string;
        email: string;
        totalInvoices: number;
        totalRevenue: number;
        currency: string;
        lastInvoiceDate: Date;
        invoices: Invoice[];
    }>();

    invoices.forEach((invoice) => {
        const existing = clientsMap.get(invoice.toEmail);
        if (existing) {
            existing.totalInvoices++;
            existing.invoices.push(invoice);
            if (invoice.status === "PAID") {
                existing.totalRevenue += invoice.total;
            }
            if (invoice.date > existing.lastInvoiceDate) {
                existing.lastInvoiceDate = invoice.date;
            }
        } else {
            clientsMap.set(invoice.toEmail, {
                name: invoice.toName,
                email: invoice.toEmail,
                totalInvoices: 1,
                totalRevenue: invoice.status === "PAID" ? invoice.total : 0,
                lastInvoiceDate: invoice.date,
                currency: invoice.currency,
                invoices: [invoice],
            });
        }
    });

    const clients = Array.from(clientsMap.values()).sort(
        (a, b) => b.lastInvoiceDate.getTime() - a.lastInvoiceDate.getTime()
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Clients"
                description="Manage your client relationships and view their invoicing history."
                action={
                    <Link href="/dashboard/invoices/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Invoice
                        </Button>
                    </Link>
                }
            />

            <SectionCard>
                <Toolbar
                    left={
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <Input
                                placeholder="Search clients..."
                                className="pl-9"
                            />
                        </div>
                    }
                />

                <ClientList clients={clients} />
            </SectionCard>
        </div>
    );
}
