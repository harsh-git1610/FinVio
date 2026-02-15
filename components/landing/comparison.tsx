"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, X } from "lucide-react";

export function Comparison() {
    return (
        <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-100">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    <FadeIn>
                        <span className="text-blue-600 font-semibold tracking-tight">For finance teams</span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                            Automate your accounts receivable
                        </h2>
                        <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                            FinVio helps your finance teams automate invoice creation, payment collection
                            and reconciliation — improving efficiency and accelerating cash flow by reducing
                            Days Sales Outstanding (DSO).
                        </p>
                        <div className="mt-8">
                            <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium border-0">
                                Create an account
                            </Button>
                        </div>

                        <div className="mt-16">
                            <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                                A more efficient way to accept wire transfers and ACH
                            </h3>
                            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                                Many businesses prefer to pay large invoices via wire or ACH, but this can require
                                tedious and manual accounts receivable efforts. FinVio automates how businesses
                                support B2B payment methods.
                            </p>
                            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
                                Collect invoices via secure and reliable <span className="text-emerald-600 font-medium">Direct Debit</span> payments.
                                Get paid faster and minimize transaction failures by enabling customers to instantly link their bank accounts.
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2} className="lg:mt-32">
                        <div className="rounded-2xl border border-neutral-200 bg-white shadow-xl overflow-hidden">
                            <div className="grid grid-cols-3 bg-neutral-50/50 border-b border-neutral-100 p-4">
                                <div className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Step</div>
                                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Traditional Flow</div>
                                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">FinVio</div>
                            </div>

                            <div className="divide-y divide-neutral-100">
                                {[
                                    { step: "Send invoice", manual: "Manual PDF email", auto: "Automatic email" },
                                    { step: "Review bank statement", manual: "Manual check", auto: "Automatic sync" },
                                    { step: "Notice new payment", manual: "Manual refresh", auto: "Instant alert" },
                                    { step: "Match payment", manual: "Manual entry", auto: "Auto-reconcile" },
                                    { step: "Mark invoice as paid", manual: "Manual update", auto: "Automatic update" },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-3 p-4 items-center hover:bg-neutral-50 transition-colors">
                                        <div className="font-medium text-sm text-neutral-900">{row.step}</div>
                                        <div className="text-sm text-neutral-500 flex items-center gap-2">
                                            {/* <X size={14} className="text-neutral-400" /> */}
                                            {row.manual}
                                        </div>
                                        <div className="text-sm font-medium text-blue-600 flex items-center gap-2">
                                            <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                                <Check size={12} className="text-emerald-600" strokeWidth={3} />
                                            </div>
                                            {row.auto}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mini visual for "Automate " */}
                        <div className="mt-8 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                            <h4 className="font-semibold text-sm text-neutral-900 mb-2">Automate reconciliation</h4>
                            <p className="text-sm text-neutral-600">
                                For ACH Credit payments, FinVio generates virtual bank account numbers to keep your
                                company's banking details private and automatically reconciles incoming payments.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
