"use client";

import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { CalendarIcon, Plus, Trash2, Send, Save, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, getFormProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { createInvoiceSchema, draftInvoiceSchema, type InvoiceItem } from "@/app/utils/zodSchema";
import { useActionState } from "react";
import { createInvoice, editInvoice } from "@/app/actions";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { FileUpload } from "./ui/file-upload";
import { AssetPicker } from "./AssetPicker";

interface CreateInvoiceProps {
    firstName?: string;
    lastName?: string;
    address?: string;
    email?: string;
    businessName?: string;
    invoice?: any;
}

export default function CreateInvoice({
    firstName,
    lastName,
    address,
    email,
    businessName,
    invoice
}: CreateInvoiceProps) {
    const [invoiceNumber, setInvoiceNumber] = useState(invoice?.invoiceNumber ?? "INV-001");
    const [date, setDate] = useState<Date | undefined>(invoice?.date ? new Date(invoice.date) : new Date());
    const [dueDate, setDueDate] = useState<Date | undefined>(invoice?.dueDate ? new Date(invoice.dueDate) : undefined);
    const [currency, setCurrency] = useState(invoice?.currency ?? "USD");

    const [fromName, setFromName] = useState(invoice?.fromName ?? (businessName || `${firstName || ''} ${lastName || ''}`.trim()));
    const [fromEmail, setFromEmail] = useState(invoice?.fromEmail ?? (email || ""));
    const [fromAddress, setFromAddress] = useState(invoice?.fromAddress ?? (address || ""));

    const [toName, setToName] = useState(invoice?.toName ?? "");
    const [toEmail, setToEmail] = useState(invoice?.toEmail ?? "");
    const [toAddress, setToAddress] = useState(invoice?.toAddress ?? "");

    const [companyLogo, setCompanyLogo] = useState<string>(invoice?.companyLogo ?? "");
    const [signature, setSignature] = useState<string>(invoice?.signature ?? "");

    const [items, setItems] = useState<InvoiceItem[]>(invoice?.items ? (invoice.items as InvoiceItem[]) : [
        { id: "1", description: "Web Design Services", quantity: 1, price: 1500 },
    ]);

    const [notes, setNotes] = useState(invoice?.notes ?? "");
    const [taxRate, setTaxRate] = useState(invoice?.taxRate ?? 10);
    const [taxName, setTaxName] = useState(invoice?.taxName ?? "Tax");
    const [discount, setDiscount] = useState(invoice?.discount ?? 0);

    const [template, setTemplate] = useState(invoice?.template ?? "clean");
    const [color, setColor] = useState(invoice?.color ?? "#000000");

    // Form validation with Conform
    const [lastResult, action] = useActionState(invoice ? editInvoice.bind(null, invoice.id) : createInvoice, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: draftInvoiceSchema });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    useEffect(() => {
        if (!lastResult) return;

        if (lastResult.status === "success") {
            toast.success("Invoice Saved", {
                description: "Your invoice has been successfully saved."
            });
        } else if (lastResult.status === "error") {
            toast.error("Error Saving Invoice", {
                description: "Please check the form for errors and try again."
            });
        }
    }, [lastResult]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Math.random().toString(36).substr(2, 9), description: "", quantity: 1, price: 0 },
        ]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const discountAmount = subtotal * (discount / 100);
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * (taxRate / 100);
    const total = taxableAmount + tax;

    return (
        <form {...getFormProps(form)} action={action}>
            <input type="hidden" name="items" value={JSON.stringify(items)} />
            <input type="hidden" name="date" value={date?.toISOString() ?? ""} />

            <input type="hidden" name="dueDate" value={dueDate?.toISOString() ?? ""} />
            <input type="hidden" name="companyLogo" value={companyLogo} />
            <input type="hidden" name="signature" value={signature} />

            <input type="hidden" name="invoiceNumber" value={invoiceNumber} />
            <input type="hidden" name="fromName" value={fromName} />
            <input type="hidden" name="fromEmail" value={fromEmail} />
            <input type="hidden" name="fromAddress" value={fromAddress} />
            <input type="hidden" name="toName" value={toName} />
            <input type="hidden" name="toEmail" value={toEmail} />
            <input type="hidden" name="toAddress" value={toAddress} />
            <input type="hidden" name="taxName" value={taxName} />
            <input type="hidden" name="taxRate" value={taxRate} />
            <input type="hidden" name="discount" value={discount} />
            <input type="hidden" name="notes" value={notes} />
            <input type="hidden" name="template" value={template} />
            <input type="hidden" name="color" value={color} />
            <div className="max-w-5xl mx-auto py-10 px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {invoice ? "Edit Invoice" : "Create Invoice"}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {invoice ? "Update your existing invoice." : "Draft a new invoice for your client."}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button type="submit" name="action" value="save-draft" variant="outline">
                            <Save className="w-4 h-4 mr-2" />
                            Save Draft
                        </Button>
                        <Button type="submit" name="action" value="create-invoice">
                            <Send className="w-4 h-4 mr-2" />
                            {invoice ? "Update Invoice" : "Create Invoice"}
                        </Button>
                    </div>
                </div>

                {lastResult?.status === "error" && lastResult?.error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            <ul className="list-disc pl-4">
                                {Object.entries(lastResult.error).flatMap(([key, messages]) =>
                                    Array.isArray(messages) ? messages.map((msg, i) => <li key={`${key}-${i}`}>{msg}</li>) : null
                                )}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Invoice Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm ring-1 ring-border/50">
                            <CardContent className="p-0">
                                <Accordion type="single" collapsible defaultValue="invoice-details" className="w-full">

                                    {/* Invoice Details */}
                                    <AccordionItem value="invoice-details" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Invoice Details</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="flex flex-col gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Invoice No.</Label>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center">
                                                            <span className="text-muted-foreground font-mono text-lg mr-1">#</span>
                                                            <Input
                                                                name={fields.invoiceNumber.name}
                                                                key={fields.invoiceNumber.key}
                                                                value={invoiceNumber}
                                                                onChange={(e) => setInvoiceNumber(e.target.value)}
                                                                className="font-mono text-lg font-medium border-none shadow-none p-0 h-auto focus-visible:ring-0 w-32 bg-transparent"
                                                            />
                                                        </div>
                                                        <p className="text-red-500 text-sm mt-1">{fields.invoiceNumber.errors}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-6">
                                                    <div className="space-y-2 flex-1">
                                                        <Label className="text-muted-foreground uppercase text-xs tracking-wider">Date</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !date && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={date}
                                                                    onSelect={setDate}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <p className="text-red-500 text-sm">{fields.date.errors}</p>
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <Label className="text-muted-foreground uppercase text-xs tracking-wider">Due Date</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    type="button"
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full justify-start text-left font-normal",
                                                                        !dueDate && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={dueDate}
                                                                    onSelect={setDueDate}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Company Details (From) */}
                                    <AccordionItem value="company-details" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Company Details</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <Input
                                                            name={fields.fromName.name}
                                                            key={fields.fromName.key}
                                                            placeholder="Your Name / Business"
                                                            value={fromName}
                                                            onChange={(e) => setFromName(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                                                    </div>
                                                    <div>
                                                        <Input
                                                            name={fields.fromEmail.name}
                                                            key={fields.fromEmail.key}
                                                            placeholder="Email Address"
                                                            type="email"
                                                            value={fromEmail}
                                                            onChange={(e) => setFromEmail(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.fromEmail.errors}</p>
                                                    </div>
                                                    <div>
                                                        <Textarea
                                                            name={fields.fromAddress.name}
                                                            key={fields.fromAddress.key}
                                                            placeholder="Address"
                                                            className="resize-none"
                                                            rows={3}
                                                            value={fromAddress}
                                                            onChange={(e) => setFromAddress(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.fromAddress.errors}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Company Logo</Label>
                                                    <div className="p-2 dark:border-neutral-800">
                                                        <AssetPicker
                                                            type="LOGO"
                                                            value={companyLogo}
                                                            onChange={setCompanyLogo}
                                                            label="Select Company Logo"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Signature</Label>
                                                    <div className="p-2 dark:border-neutral-800">
                                                        <AssetPicker
                                                            type="SIGNATURE"
                                                            value={signature}
                                                            onChange={setSignature}
                                                            label="Select Signature"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Client Details (To) */}
                                    <AccordionItem value="client-details" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Client Details</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-4">
                                                <div className="space-y-3">
                                                    <div>
                                                        <Input
                                                            name={fields.toName.name}
                                                            key={fields.toName.key}
                                                            placeholder="Client Name"
                                                            value={toName}
                                                            onChange={(e) => setToName(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.toName.errors}</p>
                                                    </div>
                                                    <div>
                                                        <Input
                                                            name={fields.toEmail.name}
                                                            key={fields.toEmail.key}
                                                            placeholder="Client Email"
                                                            type="email"
                                                            value={toEmail}
                                                            onChange={(e) => setToEmail(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.toEmail.errors}</p>
                                                    </div>
                                                    <div>
                                                        <Textarea
                                                            name={fields.toAddress.name}
                                                            key={fields.toAddress.key}
                                                            placeholder="Client Address"
                                                            className="resize-none"
                                                            rows={3}
                                                            value={toAddress}
                                                            onChange={(e) => setToAddress(e.target.value)}
                                                        />
                                                        <p className="text-red-500 text-sm">{fields.toAddress.errors}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Invoice Items */}
                                    <AccordionItem value="invoice-items" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Invoice Items</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-4">
                                                <div className="rounded-md border">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="bg-muted/50">
                                                                <TableHead className="w-[40%]">Description</TableHead>
                                                                <TableHead className="w-[20%]">Quantity</TableHead>
                                                                <TableHead className="w-[20%]">Price</TableHead>
                                                                <TableHead className="w-[15%] text-right">Total</TableHead>
                                                                <TableHead className="w-[5%]"></TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {items.map((item) => (
                                                                <TableRow key={item.id}>
                                                                    <TableCell>
                                                                        <Input
                                                                            value={item.description}
                                                                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                                                            placeholder="Item description"
                                                                            className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Input
                                                                            type="number"
                                                                            value={item.quantity}
                                                                            onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                                                                            className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex items-center">
                                                                            <span className="text-muted-foreground mr-1">{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : "£"}</span>
                                                                            <Input
                                                                                type="number"
                                                                                value={item.price}
                                                                                onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                                                                                className="border-0 shadow-none focus-visible:ring-0 px-0 h-auto"
                                                                            />
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className="text-right font-medium">
                                                                        {currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : "£"}{(item.quantity * item.price).toFixed(2)}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Button
                                                                            type="button"
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="text-muted-foreground hover:text-destructive"
                                                                            onClick={() => removeItem(item.id)}
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                                <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full border-dashed">
                                                    <Plus className="w-4 h-4 mr-2" /> Add Item
                                                </Button>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Tax & Discount Settings */}
                                    <AccordionItem value="tax-discount" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Tax & Discount Settings</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-6">
                                                {/* Discount Section */}
                                                <div className="space-y-3">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Discount</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            type="number"
                                                            name="discount"
                                                            value={discount}
                                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                                            placeholder="0"
                                                            className="w-32"
                                                        />
                                                        <span className="text-sm text-muted-foreground">% Percentage</span>
                                                    </div>
                                                </div>

                                                {/* Tax Section */}
                                                <div className="space-y-3">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Tax Configuration</Label>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Tax Label</Label>
                                                            <Input
                                                                name="taxName"
                                                                value={taxName}
                                                                onChange={(e) => setTaxName(e.target.value)}
                                                                placeholder="e.g. VAT, GST, Sales Tax"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Tax Rate (%)</Label>
                                                            <Input
                                                                name="taxRate"
                                                                type="number"
                                                                value={taxRate}
                                                                onChange={(e) => setTaxRate(Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="pt-2">
                                                        <Label className="text-xs text-muted-foreground mb-2 block">Quick GST Select</Label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {[0, 5, 12, 18, 28].map((rate) => (
                                                                <Badge
                                                                    key={rate}
                                                                    variant={taxRate === rate && (taxName === "GST" || taxName === "IGST") ? "default" : "outline"}
                                                                    className="cursor-pointer px-4 py-1 hover:bg-primary/10"
                                                                    onClick={() => {
                                                                        setTaxRate(rate);
                                                                        setTaxName("GST");
                                                                    }}
                                                                >
                                                                    GST {rate}%
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Design & Customization */}
                                    <AccordionItem value="design-customization" className="border-b px-6">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Design & Customization</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Template</Label>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div
                                                            className={cn(
                                                                "cursor-pointer rounded-lg border-2 p-4 hover:border-primary transition-all",
                                                                template === "clean" ? "border-primary bg-primary/5" : "border-border"
                                                            )}
                                                            onClick={() => setTemplate("clean")}
                                                        >
                                                            <div className="space-y-2">
                                                                <div className="h-20 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md flex flex-col p-2 gap-1">
                                                                    <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-600 rounded-sm" />
                                                                    <div className="h-2 w-1/4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
                                                                </div>
                                                                <p className="font-medium text-sm text-center">Clean</p>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                "cursor-pointer rounded-lg border-2 p-4 hover:border-primary transition-all",
                                                                template === "modern" ? "border-primary bg-primary/5" : "border-border"
                                                            )}
                                                            onClick={() => setTemplate("modern")}
                                                        >
                                                            <div className="space-y-2">
                                                                <div className="h-20 w-full bg-neutral-100 dark:bg-neutral-800 rounded-md flex flex-col overflow-hidden relative">
                                                                    <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: color }} />
                                                                    <div className="p-2 gap-1 flex flex-col mt-2">
                                                                        <div className="h-2 w-1/3 bg-neutral-300 dark:bg-neutral-600 rounded-sm" />
                                                                        <div className="h-2 w-1/4 bg-neutral-200 dark:bg-neutral-700 rounded-sm" />
                                                                    </div>
                                                                </div>
                                                                <p className="font-medium text-sm text-center">Modern</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <Label className="text-muted-foreground uppercase text-xs tracking-wider">Accent Color</Label>
                                                    <div className="flex flex-wrap gap-3">
                                                        {["#000000", "#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c"].map((c) => (
                                                            <div
                                                                key={c}
                                                                className={cn(
                                                                    "h-8 w-8 rounded-full cursor-pointer ring-offset-2 ring-offset-background transition-all",
                                                                    color === c ? "ring-2 ring-primary scale-110" : "hover:scale-105"
                                                                )}
                                                                style={{ backgroundColor: c }}
                                                                onClick={() => setColor(c)}
                                                            />
                                                        ))}
                                                        <div className="relative">
                                                            <Input
                                                                type="color"
                                                                value={color}
                                                                onChange={(e) => setColor(e.target.value)}
                                                                className="h-8 w-8 p-0 border-none rounded-full overflow-hidden cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* Additional Information */}
                                    <AccordionItem value="additional-info" className="px-6 border-b-0">
                                        <AccordionTrigger className="hover:no-underline py-6">
                                            <span className="text-lg font-semibold">Additional Information</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6 pt-2">
                                            <div className="space-y-2">
                                                <Label>Notes</Label>
                                                <Textarea
                                                    name="notes"
                                                    placeholder="Add any notes or payment terms..."
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                    className="resize-none"
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar / Summary */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm ring-1 ring-border/50 sticky top-6">
                            <CardContent className="p-6 space-y-6">
                                <h3 className="font-semibold text-lg">Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : ""}{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Discount ({discount}%)</span>
                                        <span>-{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : ""}{discountAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">{taxName} ({taxRate}%)</span>
                                        <span>{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : ""}{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-border" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "INR" ? "₹" : ""}{total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label>Currency</Label>
                                        <input type="hidden" name="currency" value={currency} />
                                        <div className="flex gap-2">
                                            <Badge
                                                variant={currency === "USD" ? "secondary" : "outline"}
                                                className="cursor-pointer hover:bg-muted"
                                                onClick={() => setCurrency("USD")}
                                            >
                                                USD ($)
                                            </Badge>
                                            <Badge
                                                variant={currency === "EUR" ? "secondary" : "outline"}
                                                className="cursor-pointer hover:bg-muted"
                                                onClick={() => setCurrency("EUR")}
                                            >
                                                EUR (€)
                                            </Badge>
                                            {/* <Badge
                                                variant={currency === "GBP" ? "secondary" : "outline"}
                                                className="cursor-pointer hover:bg-muted"
                                                onClick={() => setCurrency("GBP")}
                                            >
                                                GBP (£)
                                            </Badge> */}
                                            <Badge
                                                variant={currency === "INR" ? "secondary" : "outline"}
                                                className="cursor-pointer hover:bg-muted"
                                                onClick={() => setCurrency("INR")}
                                            >
                                                INR (₹)
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </form>
    );
}