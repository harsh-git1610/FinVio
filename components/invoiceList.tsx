import InvoiceActions from "./invoiceActions";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Invoice } from "@/lib/generated/prisma";

export default function InvoiceList({ invoices = [] }: { invoices: Invoice[] }) {
    if(invoices.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Create your first invoice</p>
            </div>
        )
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>

                </TableRow>
                {invoices.map((invoice: Invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.toName}</TableCell>
                        <TableCell>{invoice.total}</TableCell>
                        <TableCell>{invoice.status}</TableCell>
                        <TableCell>{invoice.date.toISOString()}</TableCell>
                        <TableCell className="text-right">
                            <InvoiceActions invoiceId={invoice.id} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableHeader>
        </Table>
    );
}