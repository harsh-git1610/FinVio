import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    {/* Logo Icon (Simple minimalist shape) */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-zap"
                        >
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        InvoiceGen
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
                    >
                        Log in
                    </Link>
                    <Button asChild size="sm" className="h-9 bg-white text-black hover:bg-neutral-200">
                        <Link href="/login">Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
