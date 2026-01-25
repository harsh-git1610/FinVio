
import { generateInvoicePdf } from "./app/dashboard/invoices/pdf/generatePdf"
import fs from "fs"

const mockInvoice = {
    id: "test-id",
    invoiceNumber: "INV-001",
    date: new Date(),
    dueDate: new Date(),
    currency: "USD",
    fromName: "Test Company",
    fromEmail: "test@example.com",
    fromAddress: "123 Test St",
    toName: "Client Name",
    toEmail: "client@example.com",
    toAddress: "456 Client St",
    total: 100,
    items: [
        { description: "Item 1", quantity: 1, price: 50 },
        { description: "Item 2", quantity: 1, price: 50 }
    ],
    taxRate: 10,
    taxName: "Tax",
    discount: 0,
    notes: "Test notes",
    status: "PENDING",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "user-id",
    companyLogo: null,
    signature: null
}

async function test() {
    try {
        console.log("Generating PDF...")
        // @ts-ignore
        const buffer = await generateInvoicePdf(mockInvoice)
        console.log("PDF generated, size:", buffer.length)
        fs.writeFileSync("test.pdf", buffer)
        console.log("Saved to test.pdf")
    } catch (e) {
        console.error("Error generating PDF:", e)
    }
}

test()
