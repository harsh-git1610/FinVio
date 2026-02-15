"use client";

import { FadeIn } from "@/components/landing/fade-in";
import { motion } from "framer-motion";

export function ValueProposition() {
    return (
        <section className="py-24 sm:py-32 bg-neutral-50 border-y border-neutral-100">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <FadeIn className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
                        Everything you need to get paid professionally.
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600">
                        Simple tools that help you look professional, save time, and get paid faster.
                    </p>
                </FadeIn>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Get Paid Faster",
                            description: "Create and send professional invoices in under 2 minutes. Track exactly when clients view and pay.",
                            icon: <ZapIcon />,
                            color: "bg-blue-50 text-blue-600",
                        },
                        {
                            title: "Look Professional",
                            description: "Stand out with customizable templates. Add your logo and branding to every invoice you send.",
                            icon: <StarIcon />,
                            color: "bg-purple-50 text-purple-600",
                        },
                        {
                            title: "Save Time",
                            description: "Save client details for one-click invoicing. No more copy-pasting or manual data entry.",
                            icon: <ClockIcon />,
                            color: "bg-emerald-50 text-emerald-600",
                        },
                    ].map((item, index) => (
                        <FadeIn
                            key={index}
                            delay={index * 0.1}
                            className="group relative flex flex-col items-start p-8 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className={`h-12 w-12 rounded-xl ${item.color} flex items-center justify-center mb-6`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                            <p className="text-neutral-600 leading-relaxed">
                                {item.description}
                            </p>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ZapIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    )
}

function StarIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
