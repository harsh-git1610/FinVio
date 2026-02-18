"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
    { name: "How it works", href: "/#how-it-works" },
    { name: "Features", href: "/#features" },
    { name: "Trust", href: "/#trust" },
    { name: "Log in", href: "/login" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm dark:bg-black/50 pointer-events-auto"
                    />
                )}
            </AnimatePresence>

            {/* Navbar Container */}
            <motion.div
                layout
                className="pointer-events-auto relative z-50 bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-200/50 dark:shadow-none border border-neutral-100 dark:border-neutral-800 overflow-hidden"
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    closed: { width: "320px", height: "auto", borderRadius: "50px" },
                    open: { width: "380px", height: "auto", borderRadius: "24px" }
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
                {/* Header */}
                <motion.div layout className="flex items-center justify-between p-1.5 pl-5 pr-1.5">
                    {/* Left: Logo Icon */}
                    <Link href="/" className="flex items-center gap-2 z-50 mr-4">
                        <div className="relative h-6 w-6 overflow-hidden rounded-lg">
                            <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                        </div>
                    </Link>

                    {/* Center: Brand Name */}
                    <motion.div layout className="absolute left-1/2 -translate-x-1/2">
                        <span className="text-sm font-bold tracking-widest text-neutral-900 dark:text-white uppercase font-mono">
                            FinVio
                        </span>
                    </motion.div>

                    {/* Right: Menu Trigger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="group relative z-50 flex items-center justify-center p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-900 dark:text-white"
                        aria-label="Toggle Menu"
                    >
                        <div className="flex flex-col gap-1 w-4 h-4 justify-center items-center relative">
                            {/* Simple cross morph or standard hamburger */}
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                                className="absolute h-0.5 w-full bg-current transition-transform duration-300"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="absolute h-0.5 w-full bg-current transition-opacity duration-300"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                                className="absolute h-0.5 w-full bg-current transition-transform duration-300"
                            />
                        </div>
                    </button>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ delay: 0.1 }}
                            className="px-6 pb-4"
                        >
                            <div className="flex flex-col items-center space-y-2 pt-2">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + idx * 0.05 }}
                                        className="w-full text-center"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block py-1 text-xl font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="w-full pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col items-center">
                                    <p className="text-[10px] text-neutral-400 mb-3 uppercase tracking-wider font-semibold">The helpful AI platform</p>

                                    <div className="flex items-center gap-3">
                                        <Button asChild className="rounded-full bg-neutral-900 px-6 py-2 h-10 text-sm font-medium text-white shadow-lg hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                                Get Started
                                            </Link>
                                        </Button>
                                        <ModeToggle />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
