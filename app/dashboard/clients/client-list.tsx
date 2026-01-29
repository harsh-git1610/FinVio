"use client";

import { useState } from "react";
import { Invoice } from "@/lib/generated/prisma";
import InvoiceList from "@/components/invoiceList";
import { EmptyState } from "@/components/ui/empty-state";
import { Users } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface ClientData {
    name: string;
    email: string;
    totalInvoices: number;
    totalRevenue: number;
    currency: string;
    lastInvoiceDate: Date;
    invoices: Invoice[];
}

interface ClientListProps {
    clients: ClientData[];
}

export function ClientList({ clients }: ClientListProps) {
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

    if (clients.length === 0) {
        return (
            <EmptyState
                icon={Users}
                title="No clients yet"
                description="Create your first invoice to start building your client list."
                action={{
                    label: "Create Invoice",
                    onClick: () => { window.location.href = "/dashboard/invoices/create" },
                }}
            />
        );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-neutral-200 text-left text-sm font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                            <th className="pb-3 pr-4">Client Name</th>
                            <th className="pb-3 pr-4">Email</th>
                            <th className="pb-3 pr-4">Total Invoices</th>
                            <th className="pb-3 pr-4">Total Revenue</th>
                            <th className="pb-3">Last Invoice</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                        {clients.map((client) => (
                            <tr
                                key={client.email}
                                onClick={() => setSelectedClient(client)}
                                className="group cursor-pointer transition-smooth hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                            >
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                                            {client.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-neutral-900 dark:text-neutral-50">
                                            {client.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 pr-4 text-sm text-neutral-600 dark:text-neutral-300">
                                    {client.email}
                                </td>
                                <td className="py-4 pr-4 text-sm text-neutral-900 dark:text-neutral-50">
                                    {client.totalInvoices}
                                </td>
                                <td className="py-4 pr-4 font-medium text-neutral-900 dark:text-neutral-50">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: client.currency,
                                    }).format(client.totalRevenue)}
                                </td>
                                <td className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    {new Date(client.lastInvoiceDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={!!selectedClient} onOpenChange={(open) => !open && setSelectedClient(null)}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Invoices for {selectedClient?.name}</DialogTitle>
                        <DialogDescription>
                            Viewing {selectedClient?.invoices.length} invoices for {selectedClient?.email}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedClient && (
                        <div className="mt-4">
                            <InvoiceList invoices={selectedClient.invoices} />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
