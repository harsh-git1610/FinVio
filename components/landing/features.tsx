"use client";

import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/landing/fade-in";

export function Features() {
    const features = [
        { title: "AI Invoice Assistant", desc: "Draft invoices with natural language." },
        { title: "PDF Generation", desc: "Download sleek, compliant PDF invoices." },
        { title: "Multi-currency", desc: "Support for USD, EUR, GBP, and more." },
        { title: "Client Management", desc: "Save client details for one-click invoicing." },
        { title: "Revenue Analytics", desc: " Visualize your income trends instantly." },
        { title: "Secure Auth", desc: "Enterprise-grade security by Clerk." },
    ];

    return (
        <section className="py-24 bg-white/5 border-y border-white/5">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={index * 0.05} className="group flex flex-col gap-2">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white transition-colors group-hover:text-blue-400">
                                <CheckCircle2 className="h-5 w-5 text-neutral-500 transition-colors group-hover:text-blue-500" />
                                {feature.title}
                            </h3>
                            <p className="pl-7 text-neutral-400 transition-colors group-hover:text-neutral-300">
                                {feature.desc}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
