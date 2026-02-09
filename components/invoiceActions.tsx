"use client";

import { CheckCircle, DownloadCloudIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { deleteInvoice, markAsPaid } from "@/app/actions";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface InvoiceActionsProps {
    invoiceId: string;
    status: string;
}

export default function InvoiceActions({ invoiceId, status }: InvoiceActionsProps) {
    const handleDelete = async () => {
        const result = await deleteInvoice(invoiceId);
        toast.promise(Promise.resolve(result), {
            loading: "Deleting invoice...",
            success: "Invoice deleted",
            error: "Error deleting invoice"
        });
    };

    const handleMarkAsPaid = async () => {
        const result = await markAsPaid(invoiceId);
        toast.promise(Promise.resolve(result), {
            loading: "Updating status...",
            success: "Invoice marked as paid",
            error: "Error updating status"
        });
    }

    const [open, setOpen] = useState(false);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${invoiceId}/edit`}>
                            <Pencil className="mr-2 size-4" />Edit Invoice
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/api/invoices/${invoiceId}/pdf`} target="_blank">
                            <DownloadCloudIcon className="mr-2 size-4" />Download
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href="">
                            <Mail className="mr-2 size-4" />Send Reminder
                        </Link>
                    </DropdownMenuItem>

                    {status !== "PAID" && (
                        <DropdownMenuItem asChild>
                            <form action={handleMarkAsPaid}>
                                <button type="submit" className="flex w-full items-center">
                                    <CheckCircle className="mr-2 size-4" /> Mark as Paid
                                </button>
                            </form>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        setOpen(true);
                    }}>
                        <button className="flex w-full items-center text-red-500">
                            <Trash className="mr-2 size-4" />Delete Invoice
                        </button>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the invoice
                        and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}