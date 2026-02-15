"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/landing/fade-in";

export function CTA() {
    return (
        <section className="py-24 sm:py-32 bg-neutral-900 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 pointer-events-none" />

            <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6 relative z-10">
                <FadeIn>
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Ready to simplify your finances?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-300">
                        Join thousands of freelancers who have switched to a clearer, faster way of working.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-neutral-900 hover:bg-neutral-100 transition-transform hover:scale-105 active:scale-95 duration-200">
                            <Link href="/login">Get Started for Free</Link>
                        </Button>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
