"use client";

import { useState } from "react";
import { Bell, Search, Settings, User, LogOut, Sparkles } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter} from "next/navigation";


interface TopbarProps {
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        profileImage?: string | null;
    };
}

export function Topbar({ userData }: TopbarProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const initials = `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase();
    return (
        <div className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 px-6 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
            {/*Search */}
            <div className="flex flex-1 items-center gap-4">
                {/* <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <Input
                        type="text"
                        placeholder="Search invoices, clients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 w-full rounded-lg border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm transition-smooth placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:focus:bg-neutral-900"
                    />
                    <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none rounded border border-neutral-200 bg-white px-1.5 py-0.5 font-mono text-xs text-neutral-500 sm:inline-block dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                        ⌘K
                    </kbd>
                </div> */}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                {/* Ask AI Button */}
                <Button  onClick={() => router.push("/dashboard/ai-assistant")}

                    variant="outline"
                    size="sm"
                    className="group gap-2 border-blue-200 bg-blue-50 text-blue-700 transition-smooth hover:bg-blue-100 hover:text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
                >
                    <Sparkles className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="hidden sm:inline">Ask AI</span>
                
                        
                    
                </Button>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                >
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-neutral-900" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                        >
                            {userData.profileImage ? (
                                <img
                                    src={userData.profileImage}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-medium text-white">
                                    {initials}
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium">{userData.firstName} {userData.lastName}</p>
                                <p className="text-xs text-neutral-500">{userData.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings" className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings" className="cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
