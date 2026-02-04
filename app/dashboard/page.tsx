import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DollarSign, FileText, Clock, FileEdit, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { convertToINR, formatINR } from "@/app/utils/currency";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!dbUser) {
    redirect("/login");
  }
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [thisMonthPaid, lastMonthPaid] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: dbUser.id,
        status: "PAID",
        date: { gte: startOfThisMonth },
      },
      select: { total: true, currency: true },
    }),

    prisma.invoice.findMany({
      where: {
        userId: dbUser.id,
        status: "PAID",
        date: {
          gte: startOfLastMonth,
          lt: startOfThisMonth,
        },
      },
      select: { total: true, currency: true },
    }),
  ]);

  const thisMonthRevenue = (
    await Promise.all(
      thisMonthPaid.map((i) => convertToINR(i.total, i.currency))
    )
  ).reduce((a, b) => a + b, 0);

  const lastMonthRevenue = (
    await Promise.all(
      lastMonthPaid.map((i) => convertToINR(i.total, i.currency))
    )
  ).reduce((a, b) => a + b, 0);

  let revenueChange = 0;

  if (lastMonthRevenue > 0) {
    revenueChange =
      ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
  } else if (thisMonthRevenue > 0) {
    revenueChange = 100;
  }


  // Fetch invoice statistics
  const [totalInvoices, paidInvoices, pendingInvoices, draftInvoices, recentInvoices] = await Promise.all([
    prisma.invoice.count({ where: { userId: dbUser.id } }),
    prisma.invoice.findMany({
      where: { userId: dbUser.id, status: "PAID" },
      select: { total: true, currency: true }
    }),
    prisma.invoice.count({ where: { userId: dbUser.id, status: "PENDING" } }),
    prisma.invoice.count({ where: { userId: dbUser.id, status: "DRAFT" } }),
    prisma.invoice.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  // Calculate total revenue from paid invoices in INR
  const totalRevenue = await Promise.all(
    paidInvoices.map((inv) => convertToINR(inv.total, inv.currency))
  ).then((amounts) => amounts.reduce((sum, amount) => sum + amount, 0));

  const statusMap = {
    PAID: "success",
    PENDING: "warning",
    DRAFT: "neutral",
    VOID: "danger",
  } as const;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your invoicing activity."
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue (INR)"
          value={formatINR(totalRevenue)}
          change={{ value: Math.round(revenueChange), trend: revenueChange >= 0 ? "up" : "down" }}
          icon={IndianRupee}
        />
        <StatCard
          label="Paid Invoices"
          value={paidInvoices.length}
          change={{ value: 0, trend: "up" }}
          icon={FileText}
        />
        <StatCard
          label="Pending Invoices"
          value={pendingInvoices}
          icon={Clock}
        />
        <StatCard
          label="Draft Invoices"
          value={draftInvoices}
          icon={FileEdit}
        />
      </div>

      {/* Recent Invoices */}
      <SectionCard
        title="Recent Invoices"
        description="Your most recent invoicing activity"
        action={
          <Link href="/dashboard/invoices">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        }
      >
        {recentInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-sm font-medium text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <th className="pb-3 pr-4">Invoice #</th>
                  <th className="pb-3 pr-4">Client</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {recentInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="group transition-smooth hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                  >
                    <td className="py-4 pr-4">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="font-medium text-neutral-900 hover:text-blue-600 dark:text-neutral-50 dark:hover:text-blue-400"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="py-4 pr-4 text-sm text-neutral-600 dark:text-neutral-300">
                      {invoice.toName}
                    </td>
                    <td className="py-4 pr-4 font-medium text-neutral-900 dark:text-neutral-50">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: invoice.currency,
                      }).format(invoice.total)}
                    </td>
                    <td className="py-4 pr-4">
                      <StatusBadge status={statusMap[invoice.status]}>
                        {invoice.status}
                      </StatusBadge>
                    </td>
                    <td className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                      {format(new Date(invoice.date), "MMM dd, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No invoices yet. Create your first invoice to get started.
            </p>
            <Link href="/dashboard/invoices/Create">
              <Button className="mt-4">Create Invoice</Button>
            </Link>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
