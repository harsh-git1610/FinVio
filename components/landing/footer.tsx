import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-zap"
                            >
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-white">InvoiceGen</span>
                    </div>

                    <p className="text-sm text-neutral-500">
                        © {new Date().getFullYear()} InvoiceGen. All rights reserved.
                    </p>

                    <div className="flex gap-6">
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white">Privacy</Link>
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white">Terms</Link>
                        <Link href="#" className="text-sm text-neutral-500 hover:text-white">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
