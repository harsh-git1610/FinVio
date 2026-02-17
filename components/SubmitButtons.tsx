"use client";

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2, type LucideIcon } from "lucide-react";
import { type ComponentProps } from "react";

interface SubmitButtonProps extends ComponentProps<typeof Button> {
    text?: string;
    icon?: LucideIcon;
}

export function SubmitButton({ text, icon: Icon, children, className, ...props }: SubmitButtonProps) {
    const { pending } = useFormStatus();

    const content = text || children;

    return (
        <Button
            type="submit"
            className={`w-full ${className || ''}`}
            disabled={pending}
            {...props}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                </>
            ) : (
                <>
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    {content}
                </>
            )}
        </Button>
    );
}

