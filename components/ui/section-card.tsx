import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
    title?: string;
    description?: string;
    action?: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
}

export function SectionCard({
    title,
    description,
    action,
    children,
    className,
    contentClassName,
}: SectionCardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-neutral-200 bg-white shadow-custom-sm dark:border-neutral-800 dark:bg-neutral-900",
                className
            )}
        >
            {(title || description || action) && (
                <div className="flex items-start justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                    <div className="space-y-1">
                        {title && (
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                {description}
                            </p>
                        )}
                    </div>
                    {action && <div className="flex-shrink-0">{action}</div>}
                </div>
            )}
            <div className={cn("p-6", contentClassName)}>{children}</div>
        </div>
    );
}
