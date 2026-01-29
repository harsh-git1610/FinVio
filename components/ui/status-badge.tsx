import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "success" | "warning" | "danger" | "info" | "neutral";
    children: React.ReactNode;
    size?: "sm" | "md";
    className?: string;
}

const statusStyles = {
    success: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900",
    danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900",
    info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900",
    neutral: "bg-neutral-50 text-neutral-700 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700",
};

const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
};

export function StatusBadge({
    status,
    children,
    size = "sm",
    className,
}: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md border font-medium",
                statusStyles[status],
                sizeStyles[size],
                className
            )}
        >
            {children}
        </span>
    );
}
