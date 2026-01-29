import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    icon?: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-12 text-center dark:border-neutral-700 dark:bg-neutral-900/50",
                className
            )}
        >
            {Icon && (
                <div className="mb-4 rounded-full bg-neutral-100 p-4 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
                    <Icon className="h-8 w-8" />
                </div>
            )}
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {title}
            </h3>
            {description && (
                <p className="mb-6 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                </p>
            )}
            {action && (
                <Button onClick={action.onClick} className="gap-2">
                    {action.label}
                </Button>
            )}
        </div>
    );
}
