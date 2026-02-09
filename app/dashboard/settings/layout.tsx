// app/settings/layout.tsx
import { PageHeader } from "@/components/ui/page-header";
import { SettingsNav } from "../../../components/settings-nav";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your account settings and preferences."
            />

            <SettingsNav />

            {children}
        </div>
    );
}
