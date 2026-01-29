"use client";

import { useState, useTransition, useRef } from "react";
import { Button } from "@/components/ui/button";
import { uploadProfilePhoto, removeProfilePhoto } from "@/app/actions/profile";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";

interface ProfilePhotoUploadProps {
    currentImage?: string | null;
    firstName: string;
    lastName: string;
    email: string;
}

export function ProfilePhotoUpload({
    currentImage,
    firstName,
    lastName,
    email,
}: ProfilePhotoUploadProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setError(null);
        const file = files[0];

        // Client-side validation
        if (!file.type.startsWith("image/")) {
            setError("Please upload an image file");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("File size must be less than 2MB");
            return;
        }

        startTransition(async () => {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadProfilePhoto(formData);

            if (result.error) {
                setError(result.error);
            } else {
                // Refresh the page to show new image
                router.refresh();
            }
        });

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemove = () => {
        startTransition(async () => {
            const result = await removeProfilePhoto();

            if (result.error) {
                setError(result.error);
            } else {
                router.refresh();
            }
        });
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-start gap-6">
                {/* Avatar Display */}
                <div className="relative">
                    {currentImage ? (
                        <img
                            src={currentImage}
                            alt="Profile"
                            className="h-24 w-24 rounded-full object-cover shadow-lg ring-2 ring-white dark:ring-neutral-900"
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-3xl font-semibold text-white shadow-lg">
                            {initials}
                        </div>
                    )}
                    {isPending && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="flex-1 space-y-3">
                    <div>
                        <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                            {firstName} {lastName}
                        </h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {email}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {!isPending && (
                            <>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleUploadClick}
                                    className="gap-2"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Photo
                                </Button>
                                {currentImage && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRemove}
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                                    >
                                        Remove
                                    </Button>
                                )}
                            </>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    )}

                    {/* Instructions */}
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        JPG, PNG or GIF. Max size 2MB. Recommended 400x400px.
                    </p>
                </div>
            </div>
        </div>
    );
}
