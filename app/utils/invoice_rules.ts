// invoice-rules.ts
export const INVOICE_RULES = {
  USD: {
    type: "US",
    taxes: [{ label: "Sales Tax", field: "salesTax", rate: 0.07 }],
    fields: {
      taxId: false,
      hsnCode: false,
      placeOfSupply: false,
    },
  },

  INR: {
    type: "INDIA",
    taxes: [
      { label: "CGST", field: "cgst", rate: 0.09 },
      { label: "SGST", field: "sgst", rate: 0.09 },
      // IGST logic applied if state ≠ buyer state
    ],
    fields: {
      taxId: true, // GSTIN
      hsnCode: true,
      placeOfSupply: true,
    },
  },
};
