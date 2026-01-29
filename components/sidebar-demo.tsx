"use client";
import React, { useState, useRef } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/custom-sidebar";
import { cn } from "@/lib/utils";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ReceiptText, LogOut, User, Settings, ChevronDown, Lock, LockOpen, ChevronUp, LogOutIcon, LayoutDashboard, Users, Image, BarChart3, Sparkles } from "lucide-react";
import { SignOutButton } from "@/components/ui/signout-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const links = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Invoices",
        href: "/dashboard/invoices",
        icon: (
            <ReceiptText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Clients",
        href: "/dashboard/clients",
        icon: (
            <Users className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Assets",
        href: "/dashboard/assets",
        icon: (
            <Image className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: (
            <BarChart3 className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "AI Assistant",
        href: "/dashboard/ai-assistant",
        icon: (
            <Sparkles className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: (
            <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
    },
];

// --- MAIN COMPONENT ---

export default function SidebarDemo() {
    const [open, setOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isLocked, setIsLocked] = React.useState(false);
    const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSidebarLeave = () => {
        if (isLocked) return;

        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }

        leaveTimeoutRef.current = setTimeout(() => {
            if (!isDropdownOpen) {
                setOpen(false);
            }
        }, 150);
    };

    const handleSidebarEnter = () => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
        }
        setOpen(true);
    };

    const handleLockClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        const newLockState = !isLocked;
        setIsLocked(newLockState);

        if (newLockState) {
            setOpen(true);
        } else {
            if (!e.currentTarget.closest('.sidebar-container')?.matches(':hover')) {
                handleSidebarLeave();
            }
        }
    }

    return (
        <Sidebar
            open={isLocked || open}
            setOpen={setOpen}
            className={cn(
                "sidebar-container group/sidebar z-10 flex h-full w-[--sidebar-width] flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-950",
                open ? "w-[--sidebar-width-expanded]" : "w-[--sidebar-width-collapsed]"
            )}
            onMouseEnter={handleSidebarEnter}
            onMouseLeave={handleSidebarLeave}
        >
            <SidebarBody className="justify-between gap-4 h-full">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between px-2 pb-6 pt-2 border-b border-dashed border-neutral-200 dark:border-neutral-800">
                        {open ? <Logo /> : <LogoIcon />}
                        {open && (
                            <button
                                onClick={handleLockClick}
                                className={`p-1.5 rounded-lg transition-all duration-200 ${isLocked
                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:text-neutral-500 dark:hover:bg-neutral-800'
                                    }`}
                                title={isLocked ? 'Unlock sidebar' : 'Lock sidebar open'}
                            >
                                {isLocked ? <Lock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
                            </button>
                        )}
                    </div>
                    <nav className="mt-4 flex flex-col gap-1">
                        {links.map((link, idx) => (
                            <SidebarLink key={idx} link={link} />
                        ))}
                    </nav>
                </div>
                <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex w-full items-center justify-start gap-2 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950 rounded-lg px-2 cursor-pointer">
                        <LogOutIcon className="h-5 w-5 shrink-0" />
                        {open && <SignOutButton />}
                    </div>
                </div>
            </SidebarBody>
        </Sidebar>
    );
}

// --- HELPER COMPONENTS ---
import { IconReceipt2 } from "@tabler/icons-react";

export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-sm">
                <IconReceipt2 className="h-5 w-5 text-white" />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg font-serif tracking-wide text-black dark:text-white"
            >
                Invocely
            </motion.span>
        </a>
    );
};

export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 shadow-sm">
                <IconReceipt2 className="h-5 w-5 text-white" />
            </div>
        </a>
    );
};