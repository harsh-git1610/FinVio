"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { motion } from "framer-motion";

export function ValueProposition() {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <FadeIn className="mx-auto max-w-2xl text-center mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Built for those who value clarity.
                    </h2>
                    <p className="mt-4 text-lg text-neutral-400">
                        No bloated features. No confusing menus. Just the tools you need to run your business, refined to perfection.
                    </p>
                </FadeIn>

                {/* Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-white/10 lg:border-t-0">
                    {[
                        {
                            id: "01",
                            title: "Lightning Fast",
                            description: "Generate professional invoices in under 10 seconds with smart defaults.",
                            visual: <LightningVisual />,
                        },
                        {
                            id: "02",
                            title: "AI Powered",
                            description: "Ask questions about your finances in plain English. No SQL required.",
                            visual: <AIVisual />,
                        },
                        {
                            id: "03",
                            title: "Privacy First",
                            description: "Your financial data is encrypted and secure. We never sell your data.",
                            visual: <PrivacyVisual />,
                        },
                    ].map((item, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                            className={`
                group relative flex flex-col justify-between border-b border-white/10 p-8 lg:border-b-0 
                ${index !== 2 ? "lg:border-r" : ""} 
                hover:bg-white/[0.02] transition-colors duration-500
              `}
                        >
                            {/* Top Markers (Desktop) */}


                            <div className="mb-12">
                                <span className="font-mono text-xs text-neutral-500 tracking-widest">[{item.id}]</span>
                                <div className="mt-12 flex items-center justify-center min-h-[160px]">
                                    {item.visual}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-[90%]">
                                    {item.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LightningVisual() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <div className="relative rounded-lg border border-white/10 bg-black/50 p-4 backdrop-blur-md w-[200px]">
                <div className="flex gap-2 mb-3">
                    <div className="h-2 w-2 rounded-full bg-red-500/20" />
                    <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
                    <div className="h-2 w-2 rounded-full bg-green-500/20" />
                </div>
                <div className="space-y-2">
                    <div className="h-2 w-3/4 bg-white/10 rounded-sm" />
                    <div className="h-2 w-1/2 bg-white/5 rounded-sm" />
                    <div className="flex items-center gap-2 mt-4">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] text-green-500 font-mono">Invoice_Gen_v2</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AIVisual() {
    return (
        <div className="relative h-32 w-32 flex items-center justify-center">
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <motion.div
                className="absolute -right-4 top-0 bg-neutral-800 text-[10px] text-white px-2 py-1 rounded-md border border-white/5"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                query.parsed
            </motion.div>
        </div>
    )
}

function PrivacyVisual() {
    return (
        <div className="relative flex items-center justify-center gap-4">
            <div className="h-2 w-12 border-t border-dashed border-white/20" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                <svg className="h-8 w-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div className="absolute -bottom-2 bg-neutral-900 border border-white/10 px-2 py-0.5 rounded-full">
                    <span className="text-[10px] text-green-500 flex items-center gap-1">
                        <span className="h-1 w-1 rounded-full bg-green-500" />
                        Auth 2.0
                    </span>
                </div>
            </div>
            <div className="h-2 w-12 border-t border-dashed border-white/20" />
        </div>
    )
}
