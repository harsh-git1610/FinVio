"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { TrendingUp, DollarSign, FileText, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { FadeIn } from "@/components/landing/fade-in";
// Assuming you have a cn utility, if not I'll use clsx directly or verify first. Standard shadcn/ui setup has it.
// If cn is not available, I'll use template literals or standard classNames to be safe, 
// or I can assume standard imports. Let's look at previous file... `import { Badge }` etc was in previous thoughts. 
// I will use standard template strings to be safe.

const chartData = [
    { day: "Mon", value: 1000 },
    { day: "Tue", value: 1800 },
    { day: "Wed", value: 1400 },
    { day: "Thu", value: 2200 },
    { day: "Fri", value: 1900 },
    { day: "Sat", value: 2800 },
    { day: "Sun", value: 2600 },
    { day: "Mon", value: 3400 },
    { day: "Tue", value: 3100 },
    { day: "Wed", value: 4200 },
    { day: "Thu", value: 3800 },
    { day: "Fri", value: 5100 },
];

const promptPills = [
    "How much revenue did I generate last month?",
    "Which client owes me the most?",
    "Draft an invoice for Acme Corp",
];

export function Analytics() {
    return (
        <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-200 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/40 opacity-50 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT COLUMN: Content */}
                    <FadeIn>
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                                <Sparkles size={14} />
                                <span>AI Financial Assistant</span>
                            </div>

                            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl mb-6">
                                Ask your business anything.
                            </h2>

                            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
                                Get instant insights about revenue, invoices, and growth with AI-powered analytics.
                                Just ask, and the assistant responds instantly.
                            </p>

                            <div className="space-y-3">
                                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Try asking...</p>
                                {promptPills.map((prompt, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.02, x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-neutral-200 shadow-sm cursor-pointer hover:border-blue-200 hover:shadow-md transition-all"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <MessageSquare size={14} />
                                        </div>
                                        <span className="text-neutral-600 group-hover:text-neutral-900 font-medium transition-colors">
                                            {prompt}
                                        </span>
                                        <ArrowRight className="ml-auto w-4 h-4 text-neutral-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* RIGHT COLUMN: AI Demo Panel */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Floating Effect Wrapper */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 ring-1 ring-neutral-200/50 shadow-2xl shadow-blue-900/10 overflow-hidden"
                            >
                                {/* Glass Shine */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-transparent pointer-events-none" />

                                <div className="p-6 sm:p-8 space-y-8">
                                    {/* Chat Interaction */}
                                    <div className="space-y-6">
                                        {/* User Bubble */}
                                        <div className="flex justify-end">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-neutral-900 text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-lg shadow-neutral-900/5 text-sm font-medium max-w-[85%]"
                                            >
                                                Show me my revenue for last month.
                                            </motion.div>
                                        </div>

                                        {/* AI Bubble */}
                                        <div className="flex gap-4">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shrink-0 mt-1">
                                                <Sparkles size={14} fill="currentColor" />
                                            </div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                                className="flex-1 space-y-4"
                                            >
                                                <div className="bg-white border border-neutral-100 rounded-2xl rounded-tl-sm p-5 shadow-sm">
                                                    <p className="text-neutral-700 text-sm mb-4">
                                                        Your total revenue for <span className="font-semibold text-neutral-900">September</span> was <span className="font-semibold text-neutral-900">$12,450</span>.
                                                    </p>

                                                    {/* Chart */}
                                                    <div className="h-[180px] w-full bg-neutral-50/50 rounded-lg border border-neutral-100 p-2 relative overflow-hidden group">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={chartData}>
                                                                <defs>
                                                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <Tooltip
                                                                    cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }}
                                                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                                />
                                                                <Area
                                                                    type="monotone"
                                                                    dataKey="value"
                                                                    stroke="#3b82f6"
                                                                    strokeWidth={3}
                                                                    fill="url(#chartGradient)"
                                                                    animationDuration={2000}
                                                                />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Stats Row */}
                                    <div className="grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
                                        {[
                                            { label: "Total Earned", value: "$12,450", icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
                                            { label: "Growth", value: "+14%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                                            { label: "Invoices Paid", value: "12", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
                                        ].map((stat, i) => (
                                            <div key={i} className="text-center group">
                                                <div className={`mx-auto h-8 w-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                                                    <stat.icon size={16} />
                                                </div>
                                                <div className="font-bold text-neutral-900 text-sm sm:text-base">{stat.value}</div>
                                                <div className="text-[10px] sm:text-xs text-neutral-500 font-medium uppercase tracking-wide">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
