// app/actions/ai.ts
'use server';
import { model } from "@/lib/ai/client";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";

export async function askAI(message: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // 1. DATA FETCHING (The Context)
  // Fetch a small summary of relevant data to "inject"
  const [invoiceCount, recentInvoices] = await Promise.all([
    prisma.invoice.count({
      where: {
        user: {
          clerkId: userId,
        },
      },
    }),
    prisma.invoice.findMany({
      where: {
        user: {
          clerkId: userId,
        },
      },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { invoiceNumber: true, toName: true, total: true, status: true }
    })
  ]);

  // 2. CONTEXT CONSTRUCTION
  // Format the data as a string the AI can read
  const contextData = `
    User Context:
    - Total Invoices: ${invoiceCount}
    - Recent Invoices: ${recentInvoices.map(inv =>
    `#${inv.invoiceNumber} to ${inv.toName} (${inv.total}, ${inv.status})`
  ).join("; ")}
  `;

  // 3. PROMPT COMPOSITION
  // Combine System Prompt + Context + User Question
  const finalPrompt = `
    ${SYSTEM_PROMPT}

    ${contextData}

    User Question: ${message}
  `;

  // 4. GENERATION
  const result = await model.generateContent(finalPrompt);
  return result.response.text();
}