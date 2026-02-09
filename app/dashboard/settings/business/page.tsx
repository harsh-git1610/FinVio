import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { updateBusiness, updateInvoiceDefaults } from "@/app/actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/ui/section-card";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";


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
export default function BusinessSettingPage({ userData }: SettingsFormProps) {
    const [businessName, setBusinessName] = useState(userData.businessName);
    const [address, setAddress] = useState(userData.address);
    const [businessState, businessAction] = useFormState(updateBusiness, undefined);
    const [defaultsState, defaultsAction] = useFormState(updateInvoiceDefaults, undefined);

    useEffect(() => {
        if (businessState?.status === "success") toast.success("Business settings updated successfully");
        else if (businessState?.status === "error") toast.error("Failed to update business settings");
    }, [businessState]);

    useEffect(() => {
        if (defaultsState?.status === "success") toast.success("Invoice defaults updated successfully");
        else if (defaultsState?.status === "error") toast.error("Failed to update invoice defaults");
    }, [defaultsState]);
    const [defaultCurrency, setDefaultCurrency] = useState(userData.defaultCurrency);
    const [defaultTaxRate, setDefaultTaxRate] = useState(userData.defaultTaxRate);
    const [defaultNotes, setDefaultNotes] = useState(userData.defaultNotes);




    return (
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

    )
 
}