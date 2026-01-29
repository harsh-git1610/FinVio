import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ToolbarProps {
    left?: ReactNode;
    right?: ReactNode;
    className?: string;
}

export function Toolbar({ left, right, className }: ToolbarProps) {
    return (
        <div
            className={cn(
                "mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
                className
            )}
        >
            {left && <div className="flex flex-1 items-center gap-2">{left}</div>}
            {right && <div className="flex items-center gap-2">{right}</div>}
        </div>
    );
}
