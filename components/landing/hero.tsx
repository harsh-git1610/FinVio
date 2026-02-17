"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center justify-center space-y-8 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mx-auto flex w-fit items-center rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 backdrop-blur-sm dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400"
                        >
                            <span className="flex items-center gap-2">
                                New: AI Financial Assistant <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl dark:text-white max-w-4xl mx-auto"
                        >
                            <span className="text-neutral-500 dark:text-neutral-500">Look professional.</span>
                            <br />
                            <Cover> Get paid faster. </Cover>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mx-auto max-w-2xl text-lg text-neutral-600 sm:text-xl dark:text-neutral-400"
                        >
                            The professional invoicing platform for freelancers and small businesses.
                            Create beautiful invoices in seconds, track payments, and save hours of admin work.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="h-12 px-8 text-base bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                            >
                                <Link href="/login">Start for free</Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 border-neutral-200 px-8 text-base text-neutral-900 hover:bg-neutral-50 bg-white dark:bg-neutral-950 dark:text-white dark:border-neutral-800 dark:hover:bg-neutral-900"
                            >
                                View Demo
                            </Button>
                        </motion.div>
                    </div>
                }
            >
                {/* Visual Mockup - Realistic Dashboard */}
                <div className="w-full h-full bg-white dark:bg-[#0F0F0F] rounded-2xl overflow-hidden flex text-left border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    {/* Sidebar */}
                    <div className="w-64 bg-neutral-50 dark:bg-[#0F0F0F] border-r border-neutral-200 dark:border-neutral-800 flex flex-col hidden md:flex">
                        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">F</span>
                            </div>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-200">FinVio</span>
                        </div>
                        <div className="p-4 space-y-1 flex-1">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg></div>
                                Dashboard
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg></div>
                                Invoices
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
                                Clients
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
                                Analytics
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="m19 5-1.4 1.4" /><path d="m5 5 1.4 1.4" /><path d="M12 10v10" /><path d="M5 20h14" /></svg></div>
                                AI Assistant
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm">
                                <div className="w-4 h-4"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg></div>
                                Settings
                            </div>
                        </div>
                        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-xs text-neutral-600 dark:text-white font-medium">SX</div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-neutral-900 dark:text-white">SpaceX</span>
                                    <span className="text-[10px] text-neutral-500">muskelon@gmail.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white dark:bg-[#0F0F0F] p-8 overflow-hidden flex flex-col">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Dashboard</h2>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            <div className="bg-neutral-50 dark:bg-[#171717] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">Total Revenue (INR)</span>
                                    <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">₹</div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">₹30,61,666</div>
                                <div className="text-xs text-emerald-600 dark:text-emerald-500 flex items-center gap-1">↑ 89% <span className="text-neutral-500">vs last month</span></div>
                            </div>
                            <div className="bg-neutral-50 dark:bg-[#171717] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">Paid Invoices</span>
                                    <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">6</div>
                                <div className="text-xs text-emerald-600 dark:text-emerald-500 flex items-center gap-1">↑ 0% <span className="text-neutral-500">vs last month</span></div>
                            </div>
                            <div className="bg-neutral-50 dark:bg-[#171717] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">Pending Invoices</span>
                                    <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">0</div>
                            </div>
                            <div className="bg-neutral-50 dark:bg-[#171717] p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-xs">Draft Invoices</span>
                                    <div className="h-6 w-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">0</div>
                            </div>
                        </div>

                        {/* Recent Invoices */}
                        <div className="bg-neutral-50 dark:bg-[#171717] rounded-xl border border-neutral-200 dark:border-neutral-800 flex-1 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">Recent Invoices</h3>
                                    <p className="text-xs text-neutral-500">Your most recent invoicing activity</p>
                                </div>
                                <div className="px-3 py-1 bg-white dark:bg-neutral-800 rounded text-xs text-neutral-600 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm">View All</div>
                            </div>
                            <div className="p-4 overflow-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="text-neutral-500 font-medium">
                                        <tr>
                                            <th className="pb-3 pl-2">Invoice #</th>
                                            <th className="pb-3">Client</th>
                                            <th className="pb-3">Amount</th>
                                            <th className="pb-3">Status</th>
                                            <th className="pb-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-neutral-600 dark:text-neutral-300">
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-3 pl-2 font-medium text-neutral-900 dark:text-neutral-200">INV-001</td>
                                            <td className="py-3">Harsh</td>
                                            <td className="py-3">$1,650.00</td>
                                            <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500 text-[10px] border border-emerald-200 dark:border-emerald-900/50">PAID</span></td>
                                            <td className="py-3 text-neutral-500">Feb 16, 2026</td>
                                        </tr>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-3 pl-2 font-medium text-neutral-900 dark:text-neutral-200">INV-010</td>
                                            <td className="py-3">Deep</td>
                                            <td className="py-3">$1,650.00</td>
                                            <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500 text-[10px] border border-emerald-200 dark:border-emerald-900/50">PAID</span></td>
                                            <td className="py-3 text-neutral-500">Dec 23, 2025</td>
                                        </tr>
                                        <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                            <td className="py-3 pl-2 font-medium text-neutral-900 dark:text-neutral-200">INV-007</td>
                                            <td className="py-3">Deep</td>
                                            <td className="py-3">$1,650.00</td>
                                            <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500 text-[10px] border border-emerald-200 dark:border-emerald-900/50">PAID</span></td>
                                            <td className="py-3 text-neutral-500">Feb 17, 2026</td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-3 pl-2 font-medium text-neutral-900 dark:text-neutral-200">INV-005</td>
                                            <td className="py-3">Deep</td>
                                            <td className="py-3">$12,075.00</td>
                                            <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-500 text-[10px] border border-emerald-200 dark:border-emerald-900/50">PAID</span></td>
                                            <td className="py-3 text-neutral-500">Jan 31, 2026</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerScroll>

            {/* Background Effects - Clean & Light */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] bg-blue-100/30 blur-[100px] rounded-full mix-blend-multiply dark:bg-blue-900/10 dark:mix-blend-normal"></div>
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] bg-purple-100/30 blur-[100px] rounded-full mix-blend-multiply dark:bg-purple-900/10 dark:mix-blend-normal"></div>
            </div>
        </section>
    );
}
