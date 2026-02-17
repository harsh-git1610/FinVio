"use client";

import { motion } from "framer-motion";

export function AIAssistant() {
    return (
        <section className="py-24 sm:py-32 overflow-hidden bg-neutral-50 border-y border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-16 lg:grid-cols-2 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                            Your financial questions, answered instantly.
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed dark:text-neutral-400">
                            Don't dig through reports. Just ask. Need to know your best month? Who owes you money?
                            FinVio's AI assistant has the answers.
                        </p>

                        <div className="flex flex-col gap-3 pt-4">
                            {[
                                "How much revenue did I generate in Q1?",
                                "Which client pays the fastest?",
                                "Draft an invoice for Acme Corp for $500",
                            ].map((prompt, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-neutral-600 bg-white p-3 rounded-xl border border-neutral-100 shadow-sm dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-300">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold dark:bg-blue-900/20 dark:text-blue-400">
                                        AI
                                    </span>
                                    <span>"{prompt}"</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 blur-3xl opacity-50 rounded-full dark:from-blue-900/20 dark:to-purple-900/20" />
                        <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl dark:bg-neutral-950 dark:border-neutral-800 dark:shadow-none">
                            <div className="space-y-4">
                                {/* Chat Bubble 1 (User) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="flex justify-end"
                                >
                                    <div className="rounded-2xl rounded-tr-sm bg-neutral-900 px-4 py-2 text-sm text-white shadow-md dark:bg-white dark:text-neutral-950">
                                        Show me my revenue for last month.
                                    </div>
                                </motion.div>

                                {/* Chat Bubble 2 (AI) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="flex justify-start"
                                >
                                    <div className="rounded-2xl rounded-tl-sm bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-neutral-800 max-w-[85%] shadow-sm dark:bg-blue-900/10 dark:border-blue-900/30 dark:text-neutral-200">
                                        <p>
                                            Your total revenue for <strong>September</strong> was{" "}
                                            <strong>$12,450.00</strong>.
                                        </p>
                                        <div className="mt-2 h-24 w-full rounded-md bg-white border border-neutral-100 flex items-end gap-1 p-2 dark:bg-neutral-900 dark:border-neutral-800">
                                            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: 0.8 + i * 0.05, // Stagger bars after bubble appears
                                                        ease: "easeOut",
                                                    }}
                                                    viewport={{ once: true }}
                                                    className="flex-1 bg-blue-500 rounded-sm dark:bg-blue-600"
                                                ></motion.div>
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
