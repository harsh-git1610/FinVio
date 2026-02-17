import puppeteer from "puppeteer"
import { getInvoiceTemplate } from "../templates/templates"
import { Invoice } from "@prisma/client"

export async function generateInvoicePdf(invoice: Invoice) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const html = getInvoiceTemplate(invoice)

  await page.setContent(html, {
    waitUntil: "networkidle0",
  })

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  })

  await browser.close()

  return pdfBuffer
}
