"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const comparisonData = {
    operations: [
        { step: "Send invoice", manual: "Manual PDF email", auto: "Automatic email" },
        { step: "Review bank statement", manual: "Manual check", auto: "Automatic sync" },
        { step: "Notice new payment", manual: "Manual refresh", auto: "Instant alert" },
        { step: "Match payment", manual: "Manual entry", auto: "Auto-reconcile" },
        { step: "Mark invoice as paid", manual: "Manual update", auto: "Automatic update" },
    ],
    analytics: [
        { step: "Track revenue", manual: "Update spreadsheets", auto: "Real-time dashboard" },
        { step: "Analyze trends", manual: "Static charts", auto: "Interactive insights" },
        { step: "Forecast growth", manual: "Guesswork", auto: "AI-driven predictions" },
        { step: "Share reports", manual: "Email attachments", auto: "Live shared links" },
        { step: "Data accuracy", manual: "Human error prone", auto: "100% automated precision" },
    ],
    ai: [
        { step: "Find information", manual: "Dig through reports", auto: "Ask natural language questions" },
        { step: "Client insights", manual: "Check multiple tools", auto: "Instant context summary" },
        { step: "Drafting invoices", manual: "Fill complex forms", auto: "Smart assistive drafting" },
        { step: "Chasing payments", manual: "Awkward emails", auto: "AI-optimized reminders" },
        { step: "Financial advice", manual: "Wait for accountant", auto: "Instant AI recommendations" },
    ],
};

const tabContent = {
    operations: {
        title: "Automate your accounts receivable",
        description: "FinVio helps your finance teams automate invoice creation, payment collection and reconciliation — improving efficiency and accelerating cash flow.",
        highlight: "Streamline revenue and reconciliation workflows."
    },
    analytics: {
        title: "Real-time financial clarity",
        description: "Stop relying on outdated spreadsheets. FinVio gives you a live pulse on your business health with interactive dashboards and automated reporting.",
        highlight: "Make data-driven decisions instantly."
    },
    ai: {
        title: "Your intelligent financial assistant",
        description: "Leverage the power of AI to handle repetitive tasks and answer complex financial questions. It's like having a CFO in your pocket.",
        highlight: "Unlock productivity with AI assistance."
    }
};

export function Comparison() {
    const [activeTab, setActiveTab] = useState("operations");

    return (
        <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                            Traditional vs. FinVio
                        </h2>
                        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                            See how FinVio transforms your financial workflow from manual drudgery to automated efficiency.
                        </p>
                    </div>
                </FadeIn>

                <Tabs defaultValue="operations" className="w-full" onValueChange={setActiveTab}>
                    <FadeIn delay={0.1}>
                        <div className="flex justify-center mb-12">
                            <TabsList className="bg-white border border-neutral-200 p-1 rounded-full h-auto shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
                                <TabsTrigger
                                    value="operations"
                                    className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white transition-all dark:data-[state=active]:bg-white dark:data-[state=active]:text-neutral-950"
                                >
                                    Operations
                                </TabsTrigger>
                                <TabsTrigger
                                    value="analytics"
                                    className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white transition-all dark:data-[state=active]:bg-white dark:data-[state=active]:text-neutral-950"
                                >
                                    Analytics
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ai"
                                    className="rounded-full px-6 py-3 text-sm font-medium data-[state=active]:bg-neutral-900 data-[state=active]:text-white transition-all dark:data-[state=active]:bg-white dark:data-[state=active]:text-neutral-950"
                                >
                                    AI Assistant
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <FadeIn delay={0.2} className="min-h-[300px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <span className="text-blue-600 font-semibold tracking-tight uppercase text-xs">
                                        {activeTab === 'operations' ? 'Efficiency' : activeTab === 'analytics' ? 'Insights' : 'Intelligence'}
                                    </span>
                                    <h3 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                        {tabContent[activeTab as keyof typeof tabContent].title}
                                    </h3>
                                    <p className="mt-6 text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
                                        {tabContent[activeTab as keyof typeof tabContent].description}
                                    </p>

                                    <div className="mt-8 p-6 bg-white rounded-xl border border-neutral-200 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
                                        <p className="font-medium text-neutral-900 flex items-center gap-3 dark:text-neutral-200">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                                <Check size={16} />
                                            </div>
                                            {tabContent[activeTab as keyof typeof tabContent].highlight}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab + "-table"}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden dark:bg-neutral-950 dark:border-neutral-800 dark:shadow-none"
                                >
                                    <div className="grid grid-cols-3 bg-neutral-50/50 border-b border-neutral-100 p-4 dark:bg-neutral-900/50 dark:border-neutral-800">
                                        <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider dark:text-white">Feature</div>
                                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider dark:text-neutral-500">Traditional</div>
                                        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider dark:text-blue-400">FinVio</div>
                                    </div>

                                    <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                        {comparisonData[activeTab as keyof typeof comparisonData].map((row, i) => (
                                            <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-neutral-50 transition-colors dark:hover:bg-neutral-900/50">
                                                <div className="font-medium text-sm text-neutral-900 pr-2 dark:text-neutral-200">{row.step}</div>
                                                <div className="text-sm text-neutral-500 flex items-center gap-2 pr-2 dark:text-neutral-500">
                                                    {row.manual}
                                                </div>
                                                <div className="text-sm font-medium text-blue-600 flex items-center gap-2 dark:text-blue-400">
                                                    <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 dark:bg-emerald-900/20">
                                                        <Check size={12} className="text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                                                    </div>
                                                    {row.auto}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </FadeIn>
                    </div>
                </Tabs>
            </div>
        </section>
    );
}
