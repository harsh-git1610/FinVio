"use client";

import { FadeIn } from "@/components/landing/fade-in";

export function Trust() {
    return (
        <section className="py-12 border-y border-neutral-100 bg-white">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <FadeIn className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:justify-between">
                    <span className="text-sm font-medium text-neutral-500">Trusted by modern freelancers</span>
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                        {/* Placeholders for logos, using text for now to keep it minimal/clean as requested */}
                        <span className="text-lg font-bold text-neutral-800">Acme Inc.</span>
                        <span className="text-lg font-bold text-neutral-800">Capsule</span>
                        <span className="text-lg font-bold text-neutral-800">Spherule</span>
                        <span className="text-lg font-bold text-neutral-800">GlobalBank</span>
                        <span className="text-lg font-bold text-neutral-800">Nietzsche</span>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
