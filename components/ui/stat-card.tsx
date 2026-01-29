import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    change?: {
        value: number;
        trend: "up" | "down";
    };
    icon?: LucideIcon;
    className?: string;
}

export function StatCard({
    label,
    value,
    change,
    icon: Icon,
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 shadow-custom-sm transition-smooth hover:shadow-custom-md dark:border-neutral-800 dark:bg-neutral-900",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {label}
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                        {value}
                    </p>
                    {change && (
                        <div className="flex items-center gap-1">
                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    change.trend === "up"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                )}
                            >
                                {change.trend === "up" ? "↑" : "↓"} {Math.abs(change.value)}%
                            </span>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                vs last month
                            </span>
                        </div>
                    )}
                </div>
                {Icon && (
                    <div className="rounded-lg bg-blue-50 p-3 text-blue-600 transition-smooth group-hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:group-hover:bg-blue-900">
                        <Icon className="h-5 w-5" />
                    </div>
                )}
            </div>
        </div>
    );
}
