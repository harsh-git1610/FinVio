"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    {/* Logo Icon (Simple minimalist shape) */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-lg">
                            <Image src="/logo.png" alt="Logo" width={30} height={30} />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                            FinVio
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
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

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-neutral-100 bg-white dark:bg-neutral-950 dark:border-neutral-800"
                    >
                        <div className="flex flex-col p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Theme</span>
                                <ModeToggle />
                            </div>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                Log in
                            </Link>
                            <Button asChild size="sm" className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200">
                                <Link href="/login" onClick={() => setIsOpen(false)}>Get Started</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
