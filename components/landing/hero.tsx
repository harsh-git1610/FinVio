"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12 text-center sm:px-6 bg-white">
            <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative z-10 max-w-4xl space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex w-fit items-center rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 backdrop-blur-sm"
                >
                    <span className="flex items-center gap-2">
                        New: AI Financial Assistant <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl"
                >
                    Get paid faster. <br />
                    <span className="text-neutral-500">Look professional.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-lg text-neutral-600 sm:text-xl"
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
                        className="h-12 px-8 text-base bg-neutral-900 text-white hover:bg-neutral-800"
                    >
                        <Link href="/login">Start for free</Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12 border-neutral-200 px-8 text-base text-neutral-900 hover:bg-neutral-50 bg-white"
                    >
                        View Demo
                    </Button>
                </motion.div>

                {/* Visual Mockup - Invoice Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 20 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                    className="mt-12 perspective-1000"
                >
                    <div className="relative mx-auto rounded-xl border border-neutral-200 bg-white p-2 shadow-2xl shadow-blue-900/10 sm:p-4 max-w-3xl rotate-x-12 transform-gpu">
                        <div className="aspect-[16/10] overflow-hidden rounded-lg bg-neutral-50 border border-neutral-100 relative">
                            {/* Abstract representation of an invoice UI */}
                            <div className="absolute top-0 left-0 right-0 h-16 border-b border-neutral-100 bg-white flex items-center px-6 justify-between">
                                <div className="h-6 w-24 bg-neutral-100 rounded-md"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 rounded-full bg-neutral-100"></div>
                                </div>
                            </div>
                            <div className="p-8 mt-16 flex gap-8">
                                <div className="w-64 space-y-3">
                                    <div className="h-4 w-32 bg-neutral-100 rounded"></div>
                                    <div className="h-4 w-24 bg-neutral-50 rounded"></div>
                                    <div className="h-24 w-full bg-white border border-neutral-100 rounded-lg p-3 space-y-2 mt-4">
                                        <div className="h-3 w-2/3 bg-neutral-100 rounded"></div>
                                        <div className="h-3 w-1/2 bg-neutral-50 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex justify-between">
                                        <div className="h-8 w-32 bg-neutral-100 rounded"></div>
                                        <div className="h-8 w-24 bg-blue-50 text-blue-600 rounded flex items-center justify-center text-xs font-medium">Paid</div>
                                    </div>
                                    <div className="h-px w-full bg-neutral-100"></div>
                                    <div className="space-y-2">
                                        <div className="h-12 w-full bg-white border border-neutral-100 rounded flex items-center px-4 justify-between">
                                            <div className="h-3 w-32 bg-neutral-100 rounded"></div>
                                            <div className="h-3 w-16 bg-neutral-100 rounded"></div>
                                        </div>
                                        <div className="h-12 w-full bg-white border border-neutral-100 rounded flex items-center px-4 justify-between">
                                            <div className="h-3 w-24 bg-neutral-100 rounded"></div>
                                            <div className="h-3 w-16 bg-neutral-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Effects - Clean & Light */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] bg-blue-100/30 blur-[100px] rounded-full mix-blend-multiply"></div>
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] bg-purple-100/30 blur-[100px] rounded-full mix-blend-multiply"></div>
            </div>
        </section>
    );
}
