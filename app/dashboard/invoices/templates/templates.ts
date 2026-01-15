import { Invoice } from "@prisma/client"

export function invoiceHtmlTemplate(invoice: Invoice) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }

          h1 {
            text-align: right;
          }

          .section {
            margin-bottom: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f5f5f5;
          }
        </style>
      </head>

      <body>
        <h1>Invoice ${invoice.invoiceNumber}</h1>

        <div class="section">
          <strong>From:</strong> ${invoice.fromName}<br/>
          ${invoice.fromEmail}
        </div>

        <div class="section">
          <strong>To:</strong> ${invoice.toName}<br/>
          ${invoice.toEmail}
        </div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            ${(invoice.items as any[])
              .map(
                (item) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `
}
