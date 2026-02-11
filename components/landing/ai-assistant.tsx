"use client";

import { motion } from "framer-motion";

export function AIAssistant() {
    return (
        <section className="py-24 sm:py-32 overflow-hidden">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Your financial questions, answered instantly.
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Don't dig through reports. Just ask. Need to know your best month? Who owes you money?
                            InvoiceGen's AI assistant has the answers.
                        </p>

                        <div className="flex flex-col gap-3 pt-4">
                            {[
                                "How much revenue did I generate in Q1?",
                                "Which client pays the fastest?",
                                "Draft an invoice for Acme Corp for $500",
                            ].map((prompt, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-neutral-500">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[10px]">AI</span>
                                    <span>"{prompt}"</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-20 rounded-full" />
                        <div className="relative rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-xl p-6 shadow-2xl">
                            <div className="space-y-4">
                                {/* Chat Bubble 1 (User) */}
                                <div className="flex justify-end">
                                    <div className="rounded-2xl rounded-tr-sm bg-neutral-800 px-4 py-2 text-sm text-white">
                                        Show me my revenue for last month.
                                    </div>
                                </div>

                                {/* Chat Bubble 2 (AI) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex justify-start"
                                >
                                    <div className="rounded-2xl rounded-tl-sm bg-blue-600/10 border border-blue-500/20 px-4 py-3 text-sm text-blue-100 max-w-[85%]">
                                        <p>Your total revenue for <strong>September</strong> was <strong>$12,450.00</strong>.</p>
                                        <div className="mt-2 h-24 w-full rounded-md bg-neutral-900/50 border border-white/5 flex items-end gap-1 p-2">
                                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/50 rounded-sm"></div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
