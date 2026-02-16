import Link from "next/link";
import { Copyright } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-neutral-950 transition-colors duration-300 overflow-hidden relative pt-12 sm:pt-20">
            <div className="container mx-auto px-6 max-w-[95%]">
                {/* Top Info Bar */}
                {/* <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-12 sm:mb-24">
                    <div className="flex flex-col gap-1">
                        <span className="text-neutral-500 uppercase tracking-wider text-xs mb-2">Info</span>
                        <Link href="/about" className="hover:underline">About</Link>
                        <Link href="/pricing" className="hover:underline">Pricing</Link>
                        <Link href="/blog" className="hover:underline">Blog</Link>
                    </div>

                    <div className="flex flex-col gap-1 sm:text-right">
                        <span className="text-neutral-500 uppercase tracking-wider text-xs mb-2">Legal</span>
                        <Link href="/legal/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/legal/terms" className="hover:underline">Terms of Service</Link>
                    </div>
                </div> */}

                {/* Main Content Area */}
                <div className="relative ">
                    {/* Floating Layout Elements */}
                    <div className="absolute right-0 top-0 sm:-top-10 flex items-center gap-2 text-neutral-900 dark:text-white z-10">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium opacity-80 decoration-neutral-500">
                            <span>Site by</span>
                            <span className="font-bold">Harsh</span>
                        </div>
                        
                    </div>

                    {/* MASSIVE TYPOGRAPHY */}
                    <div className="w-full flex justify-center items-end border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-4">
                        <h1 className="text-[30vw] leading-[0.7] font-bold tracking-tighter text-neutral-950 dark:text-white transition-colors duration-300 select-none -mb-[4vw]">
                            FINVIO
                        </h1>
                    </div>
                </div>
            </div>
        </footer>
    );
}
