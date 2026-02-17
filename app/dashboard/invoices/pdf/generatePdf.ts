import { getInvoiceTemplate } from "../templates/templates"
import { Invoice } from "@prisma/client"

export async function generateInvoicePdf(invoice: Invoice) {
  let browser

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    const chromium = await import("@sparticuz/chromium")
    const puppeteer = await import("puppeteer-core")

    browser = await puppeteer.default.launch({
      args: chromium.default.args,
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    })
  } else {
    const puppeteer = await import("puppeteer")
    browser = await puppeteer.default.launch()
  }

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
