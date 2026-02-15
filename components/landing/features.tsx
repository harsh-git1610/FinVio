"use client";

import { CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/landing/fade-in";

export function Features() {
    const features = [
        { title: "Professional Templates", desc: "Customize invoices with your logo and colors to look your best." },
        { title: "Multi-currency Support", desc: "Bill international clients in their local currency effortlessly." },
        { title: "Payment Tracking", desc: "Know exactly when clients view and pay your invoices." },
        { title: "Client Management", desc: "Store client details for faster one-click invoicing." },
        { title: "Beautiful PDFs", desc: "Download high-quality, print-ready PDF invoices instantly." },
        { title: "Smart Assistant", desc: "Chat with AI to answer questions about your business finances." },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl mb-4">
                        Everything run your business.
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl">
                        Powerful features that help you manage your freelance business without the complexity.
                    </p>
                </div>
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={index * 0.05} className="group flex flex-col gap-2">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 transition-colors group-hover:text-blue-600">
                                <CheckCircle2 className="h-5 w-5 text-blue-600/80 transition-colors group-hover:text-blue-600" />
                                {feature.title}
                            </h3>
                            <p className="pl-7 text-neutral-600 transition-colors group-hover:text-neutral-900">
                                {feature.desc}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
