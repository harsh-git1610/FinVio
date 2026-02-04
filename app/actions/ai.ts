// app/actions/ai.ts
'use server';
import { model } from "@/lib/ai/client";
import { SYSTEM_PROMPT } from "@/lib/ai/prompt";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/utils/db";
import { revalidatePath } from "next/cache";

// --- HELPERS ---
async function getUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true }
  });

  if (!user) throw new Error("User not found");
  return user;
}

// --- ACTIONS ---

export async function getUserChats() {
  const user = await getUser();
  return await prisma.chatSession.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: { messages: true }
      }
    }
  });
}

export async function getChatMessages(sessionId: string) {
  const user = await getUser();

  // Verify ownership
  const session = await prisma.chatSession.findFirst({
    where: { id: sessionId, userId: user.id }
  });

  if (!session) return [];

  return await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" }
  });
}

export async function createChat() {
  const user = await getUser();
  const session = await prisma.chatSession.create({
    data: {
      userId: user.id,
      title: "New Chat",
    }
  });

  revalidatePath("/dashboard/ai-assistant");
  return session.id;
}

export async function renameChat(sessionId: string, title: string) {
  const user = await getUser();
  await prisma.chatSession.updateMany({
    where: { id: sessionId, userId: user.id },
    data: { title }
  });
  revalidatePath("/dashboard/ai-assistant");
}

export async function deleteChat(sessionId: string) {
  const user = await getUser();
  await prisma.chatSession.deleteMany({
    where: { id: sessionId, userId: user.id },
  });
  revalidatePath("/dashboard/ai-assistant");
}

export async function askAI(message: string, sessionId?: string) {
  const { userId } = await auth(); // Clerk ID
  if (!userId) throw new Error("Unauthorized");

  // 1. Resolve User & Session
  // We need the DB user ID for relations
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { id: true }
  });
  if (!user) throw new Error("User not found");

  let currentSessionId = sessionId;

  // If no session provided, create one
  if (!currentSessionId) {
    const newSession = await prisma.chatSession.create({
      data: { userId: user.id, title: message.slice(0, 30) }
    });
    currentSessionId = newSession.id;
  }

  // 2. DATA FETCHING (Smart Context)
  const [invoiceCount, recentInvoices, paidStats, pendingStats] = await Promise.all([
    prisma.invoice.count({ where: { user: { clerkId: userId } } }),
    prisma.invoice.findMany({
      where: { user: { clerkId: userId } },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { invoiceNumber: true, toName: true, total: true, status: true, date: true }
    }),
    prisma.invoice.aggregate({
      where: { user: { clerkId: userId }, status: "PAID" },
      _sum: { total: true }
    }),
    prisma.invoice.aggregate({
      where: { user: { clerkId: userId }, status: "PENDING" },
      _sum: { total: true }
    })
  ]);

  const totalPaid = paidStats._sum.total || 0;
  const totalPending = pendingStats._sum.total || 0;

  const contextData = `
    User Financial Context:
    - Total Invoices Generated: ${invoiceCount}
    - Total Revenue Collected (PAID): ${totalPaid.toFixed(2)}
    - Pending Payments (Outstanding): ${totalPending.toFixed(2)}
    
    Recent Invoices (Last 5):
    ${recentInvoices.map(inv =>
    `- #${inv.invoiceNumber} to ${inv.toName}: ${inv.total} (${inv.status}) on ${inv.date.toISOString().split('T')[0]}`
  ).join("\n")}
  `;

  // 3. PROMPT COMPOSITION
  const finalPrompt = `
    ${SYSTEM_PROMPT}

    ${contextData}

    User Question: ${message}
  `;

  // 4. GENERATION
  const result = await model.generateContent(finalPrompt);
  const aiResponse = result.response.text();

  // 5. SAVE HISTORY
  await prisma.$transaction([
    prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: "user",
        content: message
      }
    }),
    prisma.chatMessage.create({
      data: {
        sessionId: currentSessionId,
        role: "assistant",
        content: aiResponse
      }
    })
  ]);

  // 6. AUTO-RENAME (If it's a generic title)
  // Simple check: if title is "New Chat" or just the first few chars of message, maybe update it?
  // For now, let's keep it simple. If it's the very first message turn in the session, we can ask AI to title it.
  // We can do that asynchronously or just use the user message as title for now.
  // The code above uses `message.slice(0, 30)` as default title which is decent.

  // Return both response and sessionId so UI can update URL/State
  return { response: aiResponse, sessionId: currentSessionId };
}