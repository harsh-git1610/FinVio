"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { Button } from "@/components/ui/button";

export function Revenue() {
    return (
        <section className="py-24 sm:py-32 bg-white border-y border-neutral-100">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <FadeIn className="order-2 lg:order-1">
                        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-neutral-900">Collections</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <p className="text-xs text-neutral-500 font-medium mb-1">Outstanding invoices</p>
                                    <p className="text-2xl font-bold text-neutral-900">£497,536.19</p>
                                    <div className="mt-4 h-2 w-full bg-neutral-100 rounded-full overflow-hidden flex">
                                        <div className="bg-amber-400 w-[15%]" />
                                        <div className="bg-amber-300 w-[10%]" />
                                        <div className="bg-amber-200 w-[5%]" />
                                        <div className="bg-emerald-400 w-[70%]" />
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="flex items-center gap-2 text-neutral-600">
                                                <div className="w-2 h-2 rounded-full bg-amber-400" /> More than 60 days overdue
                                            </span>
                                            <span className="font-medium text-neutral-900">£284,920.33</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="flex items-center gap-2 text-neutral-600">
                                                <div className="w-2 h-2 rounded-full bg-amber-300" /> 30-60 days overdue
                                            </span>
                                            <span className="font-medium text-neutral-900">£96,820.00</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs text-neutral-500 font-medium mb-1">Recovered revenue</p>
                                    <p className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                                        £111,593.70 <span className="bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0.5 rounded font-bold">+14%</span>
                                    </p>

                                    {/* CSS-only Line Chart Mock */}
                                    <div className="mt-8 h-32 relative border-b border-l border-neutral-100">
                                        {/* Mock line using SVG */}
                                        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none">
                                            <path
                                                d="M0 120 L40 110 L80 115 L120 90 L160 85 L200 60 L240 50 L280 20 L320 0"
                                                fill="none"
                                                stroke="#22c55e"
                                                strokeWidth="2"
                                            />
                                            {/* Area fill */}
                                            <path
                                                d="M0 120 L40 110 L80 115 L120 90 L160 85 L200 60 L240 50 L280 20 L320 0 V 130 H 0 Z"
                                                fill="url(#gradient)"
                                                opacity="0.1"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#22c55e" />
                                                    <stop offset="100%" stopColor="white" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-neutral-400 mt-2">
                                        <span>1 Jan</span>
                                        <span>31 Dec</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn className="order-1 lg:order-2">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-6">
                            Recover more revenue
                        </h2>
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            Improve your cash flow and get paid faster. Automatically send email reminders
                            when invoices are due or overdue and use <span className="text-emerald-600 font-medium">Smart Retries</span>, FinVio's AI-powered
                            dunning software, to retry failed payments at optimised times — recovering 38% of
                            failed payments on average.
                        </p>

                        <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                            <h4 className="font-semibold text-neutral-900 mb-2">Useful analytics</h4>
                            <p className="text-sm text-neutral-600">
                                FinVio gives you detailed reports and accounts receivable ageing reports so you can
                                monitor outstanding invoices and prioritize collections efforts.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
