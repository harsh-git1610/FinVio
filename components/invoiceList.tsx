import InvoiceActions from "./invoiceActions";
import { Table, TableCell, TableHead, TableHeader, TableRow, TableBody } from "./ui/table";
import { Invoice } from "@prisma/client";
import { Badge } from "./ui/badge";

export default function InvoiceList({ invoices = [] }: { invoices: Invoice[] }) {
    if (invoices.length === 0) {
        return (
            <div className="flex items-center justify-center h-[500px]">
                <p className="text-muted-foreground text-lg">Create your first invoice to see it here</p>
            </div>
        )
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice Id</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice: Invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>#{invoice.invoiceNumber}</TableCell>
                        <TableCell>{invoice.toName}</TableCell>
                        <TableCell>{invoice.currency} {invoice.total.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant={invoice.status === "PAID" ? "default" : invoice.status === "PENDING" ? "secondary" : "outline"}>
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <InvoiceActions invoiceId={invoice.id} status={invoice.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}