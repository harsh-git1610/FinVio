"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButtons";
import { useActionState, useEffect } from "react";
import { OnboardingUser } from "../action";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchema";
import { getInputProps, useForm } from "@conform-to/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom submit button with loading state
function SubmitButtonWithStatus({
    text,
    isPending
}: {
    text: string;
    isPending: boolean
}) {
    return (
        <SubmitButton
            text={isPending ? 'Processing...' : text}
            className="w-full h-10 bg-black hover:bg-gray-900"
            disabled={isPending}
        />
    );
}

export default function OnboardingPage() {
    const router = useRouter();

    // 1. Initialize useActionState at the top level
    const [lastResult, action, isPending] = useActionState(OnboardingUser, undefined);

    // Handle success/error states
    useEffect(() => {
        if (lastResult?.status === 'success') {
            toast.success('Onboarding completed successfully!');
            router.push('/dashboard'); // Redirect to dashboard on success
        } else if (lastResult?.error) {
            toast.error(lastResult.error.message);
        }
    }, [lastResult, router]);

    // 2. Initialize useForm at the top level
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onSubmit',
    });

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f9fafb] p-4">
            {/* 3. Link the form to the action and conform helpers */}
            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                className="w-full max-w-md"
                noValidate // Disable default browser validation to rely on conform
            >
                <Card className="border-0 shadow-sm">
                    <CardHeader className="space-y-1 text-center">
                        {/* Plus Icon SVG (as seen in the video) */}
                        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6"
                            >
                                <path d="M12 2v20M2 12h20" />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl font-semibold">You're Almost Finished!</CardTitle>
                        <CardDescription className="text-base text-gray-600">
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {/* First Name Field */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">First Name</Label>
                                <Input
                                    {...getInputProps(fields.firstName, { type: "text" })}
                                    className="h-10"
                                    placeholder="Elon"
                                />
                                {fields.firstName.errors?.map((err, idx) => (
                                    <p key={idx} className="text-red-500 text-xs">{err}</p>
                                ))}



                            </div>

                            {/* Last Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor={fields.lastName.id} className="text-sm font-medium">Last Name</Label>
                                <Input
                                    {...getInputProps(fields.lastName, { type: "text" })}
                                    className="h-10"
                                    placeholder="Musk"
                                />
                                {fields.lastName.errors?.map((err, idx) => (
                                    <p key={idx} className="text-red-500 text-xs">{err}</p>
                                ))}



                            </div>
                        </div>

                        {/* Business Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor={fields.businessName.id} className="text-sm font-medium">Business Name</Label>
                            <Input
                                {...getInputProps(fields.businessName, { type: "text" })}
                                className="h-10"
                                placeholder="SpaceX"
                            />
                            {fields.businessName.errors?.map((err, idx) => (
                                <p key={idx} className="text-red-500 text-xs">{err}</p>
                            ))}



                        </div>

                        {/* Business Address Field */}
                        <div className="space-y-2">
                            <Label htmlFor={fields.address.id} className="text-sm font-medium">Business Address</Label>
                            <Input
                                {...getInputProps(fields.address, { type: "text" })}
                                className="h-10"
                                placeholder="United States"
                            />
                            {fields.address.errors?.map((err, idx) => (
                                <p key={idx} className="text-red-500 text-xs">{err}</p>
                            ))}


                        </div>

                        {/* Display General Form Errors */}
                        {form.errors && form.errors.length > 0 && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {form.errors.map((err, index) => (
                                        <p key={index}>{err}</p>
                                    ))}
                                </AlertDescription>
                            </Alert>
                        )}


                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <SubmitButtonWithStatus text="Finish Onboarding" isPending={isPending} />


                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}