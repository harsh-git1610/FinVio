import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    breadcrumb?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    action,
    breadcrumb,
    className,
}: PageHeaderProps) {
    return (
        <div className={cn("mb-6 space-y-1", className)}>
            {breadcrumb && (
                <div className="mb-2 text-sm text-neutral-500">{breadcrumb}</div>
            )}
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {description}
                        </p>
                    )}
                </div>
                {action && <div className="flex-shrink-0">{action}</div>}
            </div>
        </div>
    );
}
