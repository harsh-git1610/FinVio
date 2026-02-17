"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock, FileText, Filter, MoreHorizontal, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Operations() {
    return (
        <section className="py-24 sm:py-32 bg-white border-y border-neutral-100 overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6 dark:text-white">
                            Simplify operations.
                        </h2>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed dark:text-neutral-400">
                            Manage invoices and view detailed reports directly from the Dashboard. It's easy to
                            update, void, duplicate, refund, or mark invoices as paid outside of FinVio. Automate
                            accounts receivable processes and reduce time spent tracking and collecting
                            invoice payments.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/20 dark:text-blue-400">
                                    <CheckCircle2 size={14} />
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">Streamline revenue and reconciliation workflows.</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center dark:bg-blue-900/20 dark:text-blue-400">
                                    <CheckCircle2 size={14} />
                                </div>
                                <p className="text-neutral-600 dark:text-neutral-400">Access prebuilt financial reports instantly.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
                                <Link href="/login">Start now </Link><Link href="/login"><ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>

                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2} className="relative">
                        {/* Dashboard Mockup Container */}
                        <div className="relative rounded-xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-200/50 overflow-hidden dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-none">
                            {/* Window Controls */}
                            <div className="h-10 border-b border-neutral-100 bg-neutral-50/50 flex items-center px-4 gap-2 dark:bg-neutral-800/50 dark:border-neutral-800">
                                <div className="h-3 w-3 rounded-full bg-red-400/20 border border-red-500/30" />
                                <div className="h-3 w-3 rounded-full bg-yellow-400/20 border border-yellow-500/30" />
                                <div className="h-3 w-3 rounded-full bg-green-400/20 border border-green-500/30" />
                            </div>

                            {/* Toolbar */}
                            <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-white dark:bg-neutral-900 dark:border-neutral-800">
                                <h3 className="font-semibold text-neutral-900 dark:text-white">Invoices</h3>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer  hover:text-blue-600 gap-2 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-white">
                                        <Filter size={12} /> Filter
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-8 text-xs cursor-pointer hover:text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:text-white">
                                        Export
                                    </Button>
                                    <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-2 dark:bg-blue-600 dark:hover:bg-blue-500">
                                        <Plus size={12} /> Create invoice
                                    </Button>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-50/50 text-xs font-medium text-neutral-500 border-b border-neutral-100 uppercase tracking-wider dark:bg-neutral-800/30 dark:border-neutral-800 dark:text-neutral-400">
                                <div className="col-span-2">Amount</div>
                                <div className="col-span-3">Invoice Number</div>
                                <div className="col-span-4">Customer</div>
                                <div className="col-span-3 text-right">Date</div>

                            </div>

                            {/* Table Rows */}
                            <div className="divide-y divide-neutral-50 bg-white dark:bg-neutral-900 dark:divide-neutral-800">
                                {[
                                    { amount: "£1,200.00", number: "INV-2024-001", customer: "Acme Corp", email: "billing@acme.com", date: "Today" },
                                    { amount: "£850.00", number: "INV-2024-002", customer: "Globex Inc", email: "finance@globex.com", date: "Yesterday" },
                                    { amount: "£2,400.00", number: "INV-2023-089", customer: "Soylent Corp", email: "ap@soylent.com", date: "Oct 24" },
                                    { amount: "£450.00", number: "INV-2024-003", customer: "Initech", email: "peter@initech.com", date: "Oct 22" },
                                    { amount: "£9,800.00", number: "INV-2023-088", customer: "Umbrella Corp", email: "wesker@umbrella.com", date: "Oct 20" },
                                ].map((invoice, i) => (
                                    <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-neutral-50/50 transition-colors group cursor-default dark:hover:bg-neutral-800/50">
                                        <div className="col-span-2 font-medium text-neutral-900 flex items-center gap-2 dark:text-neutral-200">
                                            {invoice.amount}

                                        </div>
                                        <div className="col-span-3 text-sm text-neutral-500 font-mono dark:text-neutral-500">{invoice.number}</div>
                                        <div className="col-span-4">
                                            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">{invoice.customer}</div>
                                            <div className="text-xs text-neutral-400 dark:text-neutral-500">{invoice.email}</div>
                                        </div>
                                        <div className="col-span-3 text-right text-sm text-neutral-500 dark:text-neutral-500">{invoice.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Element 1 - Notification */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border border-neutral-100 max-w-[200px] hidden lg:block animate-bounce-slow dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-none">
                            <div className="flex items-start gap-3">
                                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 dark:bg-emerald-900/20 dark:text-emerald-400">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-neutral-900 dark:text-white">Payment Received</p>
                                    <p className="text-[10px] text-neutral-500 mt-1 dark:text-neutral-400">Acme Corp paid £1,200.00 just now.</p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
