"use client";

import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfilePhotoUpload } from "@/components/profile-photo-upload";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateProfile } from "@/app/actions";
import { toast } from "sonner";

interface ProfileFormProps {
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        profileImage: string | null;
    };
}

export function ProfileForm({ userData }: ProfileFormProps) {
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);

    const [profileState, profileAction] = useFormState(updateProfile, undefined);

    useEffect(() => {
        if (profileState?.status === "success") toast.success("Profile updated successfully");
        else if (profileState?.status === "error") toast.error("Failed to update profile");
    }, [profileState]);

    return (
        <div className="space-y-4">
            <SectionCard title="Profile Photo" description="Update your profile picture">
                <ProfilePhotoUpload
                    currentImage={userData.profileImage}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                />
            </SectionCard>

            <SectionCard title="Personal Information" description="Update your personal details">
                <form action={profileAction} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </SectionCard>
        </div>
    );
}
