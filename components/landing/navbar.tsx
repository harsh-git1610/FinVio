import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    {/* Logo Icon (Simple minimalist shape) */}
                    <div className="rounded-lg">
                        <Image src="/logo.png" alt="Logo" width={30} height={30} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                        FinVio
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Link
                        href="/login"
                        className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    >
                        Log in
                    </Link>
                    <Button asChild size="sm" className="h-9 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
                        <Link href="/login">Get Started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
