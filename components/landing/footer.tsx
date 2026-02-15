import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-neutral-950 py-12">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="rounded-md">
                            <Image src="/logo.png" alt="FinVio Logo" width={24} height={16} />
                        </div>
                        <span className="text-sm font-semibold text-white">FinVio</span>
                    </div>

                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} FinVio. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
