import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Ready to simplify your finances?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-400">
                    Join thousands of freelancers who have switched to a clearer, faster way of working.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200">
                        <Link href="/login">Get Started for Free</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
