// app/settings/layout.tsx
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

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

      <Tabs value="" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <Link href="/settings">
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </Link>
          <Link href="/settings/business">
            <TabsTrigger value="business">Business</TabsTrigger>
          </Link>
          <Link href="/settings/security">
            <TabsTrigger value="security">Security</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      {children}
    </div>
  );
}
