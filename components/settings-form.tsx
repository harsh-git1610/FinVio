"use client";

import { Eye, EyeOff } from "lucide-react";

import { SectionCard } from "@/components/ui/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ProfilePhotoUpload } from "@/components/profile-photo-upload";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateProfile, updateBusiness, updateInvoiceDefaults } from "@/app/actions";
import { toast } from "sonner";
import { useUser, UserProfile } from "@clerk/nextjs";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

interface SettingsFormProps {
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        businessName: string;
        address: string;
        profileImage: string | null;
        defaultCurrency: string;
        defaultTaxRate: number;
        defaultNotes: string;
    };
}

export function SettingsForm({ userData }: SettingsFormProps) {
    // Profile state
    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);

    // Business state
    const [businessName, setBusinessName] = useState(userData.businessName);
    const [address, setAddress] = useState(userData.address);

    // Invoice Defaults state
    const [defaultCurrency, setDefaultCurrency] = useState(userData.defaultCurrency);
    const [defaultTaxRate, setDefaultTaxRate] = useState(userData.defaultTaxRate);
    const [defaultNotes, setDefaultNotes] = useState(userData.defaultNotes);

    // Security state
    const { user } = useUser();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Form actions
    const [profileState, profileAction] = useFormState(updateProfile, undefined);
    const [businessState, businessAction] = useFormState(updateBusiness, undefined);
    const [defaultsState, defaultsAction] = useFormState(updateInvoiceDefaults, undefined);

    // Handle form responses
    useEffect(() => {
        if (profileState?.status === "success") toast.success("Profile updated successfully");
        else if (profileState?.status === "error") toast.error("Failed to update profile");
    }, [profileState]);

    useEffect(() => {
        if (businessState?.status === "success") toast.success("Business settings updated successfully");
        else if (businessState?.status === "error") toast.error("Failed to update business settings");
    }, [businessState]);

    useEffect(() => {
        if (defaultsState?.status === "success") toast.success("Invoice defaults updated successfully");
        else if (defaultsState?.status === "error") toast.error("Failed to update invoice defaults");
    }, [defaultsState]);



    const handleUpdatePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!user) {
            toast.error("User not loaded");
            return;
        }

        try {
            await user.updatePassword({
                currentPassword,
                newPassword,
            });

            toast.success("Password updated successfully");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error(error);

            toast.error(
                error?.errors?.[0]?.longMessage ||
                error?.errors?.[0]?.message ||
                "Failed to update password"
            );
        }
    };





    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <>
            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
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
            </TabsContent>

            {/* Business Tab */}
            <TabsContent value="business" className="space-y-4">
                <SectionCard title="Business Information" description="Manage your business details">
                    <form action={businessAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                name="businessName"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="businessAddress">Business Address</Label>
                            <Input
                                id="businessAddress"
                                name="businessAddress"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="123 Main St, City, Country"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                                <Input id="taxId" placeholder="123456789" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" placeholder="+1 (555) 123-4567" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </SectionCard>

                <SectionCard title="Invoice Defaults" description="Set default values for new invoices">
                    <form action={defaultsAction} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="defaultCurrency">Default Currency</Label>
                                <Input
                                    id="defaultCurrency"
                                    name="defaultCurrency"
                                    value={defaultCurrency}
                                    onChange={(e) => setDefaultCurrency(e.target.value)}
                                    placeholder="USD"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="defaultTax">Default Tax Rate (%)</Label>
                                <Input
                                    id="defaultTax"
                                    name="defaultTaxRate"
                                    type="number"
                                    value={defaultTaxRate}
                                    onChange={(e) => setDefaultTaxRate(Number(e.target.value))}
                                    placeholder="10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="defaultNotes">Default Invoice Notes</Label>
                            <Input
                                id="defaultNotes"
                                name="defaultNotes"
                                value={defaultNotes}
                                onChange={(e) => setDefaultNotes(e.target.value)}
                                placeholder="Thank you for your business!"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Save Defaults</Button>
                        </div>
                    </form>
                </SectionCard>
            </TabsContent>

            {/* Security Tab */}
            {/* <TabsContent value="security" className="space-y-4">
                <SectionCard title="Password" description="Change your password">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleUpdatePassword}>Update Password</Button>
                        </div>
                    </div>
                </SectionCard>


            </TabsContent> */}

            <TabsContent value="security" className="space-y-4">
                <SectionCard
                    title="Security"
                    description="Manage your password, sessions, and verification"
                >
                    <div className="rounded-lg border bg-background p-4">
                        <UserProfile
                            routing="path"
                            path="/settings"
                            appearance={{
                                elements: {
                                    navbar: "hidden",
                                    headerTitle: "hidden",
                                    headerSubtitle: "hidden",
                                    profileSectionPrimaryButton: "hidden",
                                    profileSection: "hidden",

                                },
                            }}
                        />

                    </div>
                </SectionCard>
            </TabsContent>


        </>
    );
}
