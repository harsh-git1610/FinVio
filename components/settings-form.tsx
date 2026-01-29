"use client";

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
import { useUser } from "@clerk/nextjs";

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
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await user?.updatePassword({
                currentPassword,
                newPassword,
            });
            toast.success("Password updated successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error(error);
            toast.error(error?.errors?.[0]?.message || "Failed to update password");
        }
    };

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'system') {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            localStorage.removeItem("theme");
        } else {
            root.classList.add(theme);
            localStorage.setItem("theme", theme);
        }
        toast.success(`Theme set to ${theme}`);
    };

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
            <TabsContent value="security" className="space-y-4">
                <SectionCard title="Password" description="Change your password">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleUpdatePassword}>Update Password</Button>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                2FA Status
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Two-factor authentication is currently disabled
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => toast.info("Please use Clerk dashboard to manage 2FA")}>Enable 2FA</Button>
                    </div>
                </SectionCard>

                <SectionCard title="Active Sessions" description="Manage your active sessions">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
                            <div>
                                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                    Current Session
                                </p>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    Windows • Chrome • Active now
                                </p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => toast.info("Please use Clerk dashboard to manage sessions")}>
                                Revoke
                            </Button>
                        </div>
                    </div>
                </SectionCard>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
                <SectionCard title="Appearance" description="Customize your interface">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Theme</Label>
                            <div className="grid grid-cols-3 gap-3">
                                <button onClick={() => handleThemeChange('light')} className="rounded-lg border-2 border-blue-600 bg-white p-4 text-sm font-medium hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    Light
                                </button>
                                <button onClick={() => handleThemeChange('dark')} className="rounded-lg border border-neutral-200 bg-white p-4 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    Dark
                                </button>
                                <button onClick={() => handleThemeChange('system')} className="rounded-lg border border-neutral-200 bg-white p-4 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    System
                                </button>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="Notifications" description="Manage your notification preferences">
                    <div className="space-y-4">
                        {[
                            { label: "Email notifications", description: "Receive email updates" },
                            { label: "Invoice reminders", description: "Get reminded about pending invoices" },
                            { label: "Payment notifications", description: "Notify when payments are received" },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                        {item.label}
                                    </p>
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                        {item.description}
                                    </p>
                                </div>
                                <button onClick={() => toast.success("Notification setting saved")} className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 transition-colors cursor-pointer">
                                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                                </button>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard title="Language & Region" description="Set your language and timezone">
                    <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="language">Language</Label>
                                <Input id="language" value="English" readOnly />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Input id="timezone" value="UTC+5:30 (IST)" readOnly />
                            </div>
                        </div>
                    </div>
                </SectionCard>
            </TabsContent>
        </>
    );
}
