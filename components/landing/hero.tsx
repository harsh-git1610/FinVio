"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12 text-center sm:px-6">
            <div className="relative z-10 max-w-4xl space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-neutral-300 backdrop-blur-sm"
                >
                    <span>Introducing InvoiceGen AI</span>
                    <ArrowRight className="ml-2 h-3.5 w-3.5 opacity-50" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
                >
                    Invoice smarter. <br />
                    <span className="text-neutral-500">Understand instantly.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-2xl text-lg text-neutral-400 sm:text-xl"
                >
                    The AI-powered financial platform for freelancers and small businesses.
                    Create invoices in seconds, track payments, and get intelligent insights without the clutter.
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
                        className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200"
                    >
                        <Link href="/login">Start for free</Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12 border-white/10 px-8 text-base text-white hover:bg-white/5 bg-transparent"
                    >
                        View Demo
                    </Button>
                </motion.div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808030_1px,transparent_1px),linear-gradient(to_bottom,#80808030_1px,transparent_1px)] bg-[size:25px_25px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-500/10 via-transparent to-transparent blur-3xl rounded-full opacity-30 transform -translate-y-1/2"></div>
            </div>
        </section>
    );
}
