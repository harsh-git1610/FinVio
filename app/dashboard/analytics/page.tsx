import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { SectionCard } from "@/components/ui/section-card";
import { DollarSign, TrendingUp, FileText, Clock } from "lucide-react";
import { prisma } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { convertToINR, formatINR } from "@/app/utils/currency";
import { RevenueLineChart } from "@/components/ui/revenue-line-chart";

export default async function AnalyticsPage() {
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

    // Fetch all invoices
    const invoices = await prisma.invoice.findMany({
        where: { userId: dbUser.id },
        select: {
            total: true,
            status: true,
            date: true,
            currency: true,
        },
    });

    // Convert all amounts to INR
    const paidInvoices = invoices.filter((inv) => inv.status === "PAID");
    const pendingInvoices = invoices.filter((inv) => inv.status === "PENDING");

    // Calculate totals in INR
    const totalRevenueINR = await Promise.all(
        paidInvoices.map((inv) => convertToINR(inv.total, inv.currency))
    ).then((amounts) => amounts.reduce((sum, amount) => sum + amount, 0));

    const pendingRevenueINR = await Promise.all(
        pendingInvoices.map((inv) => convertToINR(inv.total, inv.currency))
    ).then((amounts) => amounts.reduce((sum, amount) => sum + amount, 0));

    const paidCount = paidInvoices.length;
    const pendingCount = pendingInvoices.length;
    const draftCount = invoices.filter((inv) => inv.status === "DRAFT").length;

    // Calculate monthly revenue (last 6 months) in INR from paid invoices 
    const now = new Date();
    const monthlyDataPromises = Array.from({ length: 6 }, async (_, i) => {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = month.toLocaleString("default", { month: "short" });

        const monthInvoices = invoices.filter((inv) => {
            const invDate = new Date(inv.date);
            return (
                inv.status === "PAID" &&
                invDate.getMonth() === month.getMonth() &&
                invDate.getFullYear() === month.getFullYear()
            );
        });

        const monthRevenueINR = await Promise.all(
            monthInvoices.map((inv) => convertToINR(inv.total, inv.currency))
        ).then((amounts) => amounts.reduce((sum, amount) => sum + amount, 0));

        return { month: monthName, revenue: monthRevenueINR };
    });

    const monthlyData = (await Promise.all(monthlyDataPromises)).reverse();

    return (
        <div className="space-y-6">
            <PageHeader
                title="Analytics"
                description="Track your invoicing performance and revenue trends. All amounts are converted to INR using live exchange rates."
            />

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Total Revenue (INR)"
                    value={formatINR(totalRevenueINR)}
                    icon={DollarSign}
                />
                <StatCard
                    label="Pending Revenue (INR)"
                    value={formatINR(pendingRevenueINR)}
                    icon={Clock}
                />
                <StatCard
                    label="Paid Invoices"
                    value={paidCount}
                    icon={FileText}
                />
                <StatCard
                    label="Average Invoice (INR)"
                    value={formatINR(paidCount > 0 ? totalRevenueINR / paidCount : 0)}
                    icon={TrendingUp}
                />
            </div>

            {/* Revenue Chart */}
            <SectionCard
                title="Revenue Over Time (INR)"
                description="Monthly revenue from paid invoices (last 6 months)"
            >
                <RevenueLineChart data={monthlyData} />
            </SectionCard>

            {/* Status Distribution */}
            <div className="grid gap-4 md:grid-cols-2">
                <SectionCard
                    title="Invoice Status Distribution"
                    description="Breakdown of invoices by status"
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Paid
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                {paidCount}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Pending
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                {pendingCount}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-neutral-400" />
                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                    Draft
                                </span>
                            </div>
                            <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                {draftCount}
                            </span>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Revenue Summary (INR)"
                    description="Total and pending revenue in INR"
                >
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Total Paid
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-green-600 dark:text-green-400">
                                {formatINR(totalRevenueINR)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Pending Payment
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-yellow-600 dark:text-yellow-400">
                                {formatINR(pendingRevenueINR)}
                            </p>
                        </div>
                        <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800">
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Total Expected
                            </p>
                            <p className="mt-1 text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
                                {formatINR(totalRevenueINR + pendingRevenueINR)}
                            </p>
                        </div>
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}
