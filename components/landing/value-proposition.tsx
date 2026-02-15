"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you have this, if not I'll use div
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, MoreHorizontal, Plus, Search, Send, Sparkles } from "lucide-react";

export function ValueProposition() {
    return (
        <section className="py-24 sm:py-32 bg-white border-y border-neutral-100 overflow-hidden">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <FadeIn className="mx-auto max-w-3xl text-center mb-24">
                    <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-6">
                        Everything you need to <br className="hidden sm:block" /> get paid professionally.
                    </h2>
                    <p className="text-xl text-neutral-600 leading-relaxed">
                        Simple tools that help you look professional, save time, and get paid faster.
                        Designed for modern businesses.
                    </p>
                </FadeIn>

                <div className="space-y-32">
                    {/* Feature 1: Speed */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn className="relative order-2 lg:order-1">
                            {/* Abstract decorative bg */}
                            <div className="absolute inset-0 bg-blue-50/50 rounded-3xl transform -rotate-2 scale-105 -z-10" />

                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="relative bg-white rounded-2xl border border-neutral-200 shadow-2xl shadow-blue-900/5 overflow-hidden p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between mb-8 border-b border-neutral-100 pb-4">
                                    <div className="space-y-1">
                                        <div className="h-2 w-24 bg-neutral-100 rounded" />
                                        <div className="h-4 w-32 bg-neutral-200 rounded font-semibold text-neutral-900 flex items-center">INV-2024-001</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-8 w-8 rounded-full bg-neutral-100" />
                                        <div className="h-8 w-24 bg-blue-600 rounded-md text-white text-xs font-medium flex items-center justify-center">Send</div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Bill To</div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/30">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AC</div>
                                            <div>
                                                <div className="text-sm font-medium text-neutral-900">Acme Corp</div>
                                                <div className="text-xs text-neutral-500">billing@acme.com</div>
                                            </div>
                                            <CheckCircle2 className="ml-auto w-4 h-4 text-blue-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm border-b border-neutral-50 pb-2">
                                            <span className="text-neutral-600">Web Development Services</span>
                                            <span className="font-medium text-neutral-900">$2,400.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-neutral-50 pb-2">
                                            <span className="text-neutral-600">Hosting (Annual)</span>
                                            <span className="font-medium text-neutral-900">$120.00</span>
                                        </div>
                                        <div className="flex justify-between items-center text-base pt-2">
                                            <span className="font-bold text-neutral-900">Total Due</span>
                                            <span className="font-bold text-blue-600">$2,520.00</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating AI Tag */}

                            </motion.div>
                        </FadeIn>
                        <FadeIn className="order-1 lg:order-2">
                            <h3 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                                Create invoices in seconds
                            </h3>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Generate professional invoices instantly with AI-filled client data, tax calculations, and smart defaults.
                                Stop wasting hours on manual data entry.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Smart client lookup",
                                    "One-click tax calculation",
                                    "Save templates for recurring work"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>

                    {/* Feature 2: AI Insights */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn className="order-1">
                            <h3 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                                Ask your business questions
                            </h3>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Simply type questions like &quot;How much did I earn this month?&quot; and get instant financial insights.
                                No complex dashboards or SQL required.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Natural language queries",
                                    "Instant revenue reports",
                                    "Expense categorization"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                        <FadeIn className="relative order-2">
                            {/* Abstract decorative bg */}
                            <div className="absolute inset-0 bg-purple-50/50 rounded-3xl transform rotate-2 scale-105 -z-10" />

                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl border border-neutral-200 shadow-2xl shadow-purple-900/5 overflow-hidden flex flex-col h-[400px]"
                            >
                                <div className="p-4 border-b border-neutral-100 bg-neutral-50/30 flex items-center gap-3">
                                    <div className="h-3 w-3 rounded-full bg-red-400/20 border border-red-500/30" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-400/20 border border-yellow-500/30" />
                                    <div className="h-3 w-3 rounded-full bg-green-400/20 border border-green-500/30" />
                                    <div className="ml-auto text-xs text-neutral-400 font-medium">FinVio AI Assistant</div>
                                </div>
                                <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
                                    {/* User Message */}
                                    <div className="flex justify-end">
                                        <div className="bg-neutral-900 text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm shadow-md max-w-[80%]">
                                            How does this month compare to last November?
                                        </div>
                                    </div>

                                    {/* AI Response */}
                                    <div className="flex justify-start gap-4">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shrink-0">
                                            AI
                                        </div>
                                        <div className="space-y-2 max-w-[85%]">
                                            <div className="bg-white border border-neutral-100 text-neutral-700 rounded-2xl rounded-tl-sm px-5 py-4 text-sm shadow-sm space-y-3">
                                                <p>You're up <span className="font-bold text-green-600">+24%</span> compared to last November! 🎉</p>
                                                <div className="h-24 flex items-end gap-2 pt-2 border-t border-neutral-50/50">
                                                    {/* Simple Bar Chart CSS */}
                                                    <div className="w-full bg-neutral-100 rounded-t-sm h-[60%] relative group">
                                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Nov '23</div>
                                                    </div>
                                                    <div className="w-full bg-blue-500 rounded-t-sm h-[84%] relative group">
                                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Now</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full transition-colors">
                                                    Show breakdown
                                                </button>
                                                <button className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-3 py-1.5 rounded-full transition-colors">
                                                    Export report
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-neutral-100 bg-white">
                                    <div className="relative">
                                        <input
                                            disabled
                                            placeholder="Ask a follow up question..."
                                            className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                        />
                                        <div className="absolute right-2 top-1.5 p-1 rounded-md bg-white border border-neutral-200 text-neutral-400">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeIn>
                    </div>

                    {/* Feature 3: Payment Tracking */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn className="relative order-2 lg:order-1">
                            {/* Abstract decorative bg */}
                            <div className="absolute inset-0 bg-emerald-50/50 rounded-3xl transform -rotate-2 scale-105 -z-10" />

                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl border border-neutral-200 shadow-2xl shadow-emerald-900/5 overflow-hidden p-6 sm:p-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="font-bold text-neutral-900">Recent Transactions</h4>
                                    <div className="p-2 hover:bg-neutral-50 rounded-full cursor-pointer text-neutral-400">
                                        <MoreHorizontal size={20} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { client: "Acme Corp", amount: "$2,400.00", status: "Paid", color: "text-emerald-600 bg-emerald-50 border-emerald-100", date: "Today" },
                                        { client: "Globex Inc", amount: "$850.00", status: "Pending", color: "text-amber-600 bg-amber-50 border-amber-100", date: "Yesterday" },
                                        { client: "Soylent Corp", amount: "$4,200.00", status: "Overdue", color: "text-red-600 bg-red-50 border-red-100", date: "Oct 24" },
                                        { client: "Initech", amount: "$1,150.00", status: "Paid", color: "text-emerald-600 bg-emerald-50 border-emerald-100", date: "Oct 22" },
                                    ].map((item, i) => (
                                        <div key={i} className="group flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-default border border-transparent hover:border-neutral-100">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${i === 0 || i === 3 ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 text-neutral-600'}`}>
                                                    {item.client.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-neutral-900 text-sm">{item.client}</div>
                                                    <div className="text-xs text-neutral-500">{item.date}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-neutral-900 text-sm">{item.amount}</div>
                                                <div className={`text-[10px] px-2 py-0.5 rounded-full border font-medium inline-block mt-1 ${item.status === 'Overdue' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : item.color}`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-neutral-100">
                                    <button className="w-full py-2.5 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2">
                                        View all transactions <ArrowRight size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        </FadeIn>
                        <FadeIn className="order-1 lg:order-2">
                            <h3 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                                Know when you get paid
                            </h3>
                            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                Track invoice status in real time. FinVio notifies you the moment a client views an invoice
                                and sends automated reminders so you don&apos;t have to hunt for payments.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Real-time read receipts",
                                    "Automated payment reminders",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
