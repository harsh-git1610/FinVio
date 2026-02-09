"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SecurityPage() {
  const { theme } = useTheme();

  return (
    <div className="flex justify-center w-full">
      <UserProfile
        routing="path"
        path="/dashboard/settings"
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          elements: {
            // Hide the main sidebar and header
            navbar: "hidden",
            headerTitle: "hidden",
            headerSubtitle: "hidden",

            // Layout adjustments to make it look like a seamless form
            rootBox: "w-full shadow-none p-0",
            card: "w-full shadow-none p-0 border-0 bg-transparent",
            pageScrollBox: "p-0",
            page: "p-0",

            // Ensure inputs match shadcn/ui style if not fully covered by theme
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
            formFieldInput: "bg-background border-input",
          },
        }}
      />
      <style>{`
        /* Force hide the sidebar if 'navbar: "hidden"' isn't enough */
        .cl-navbar {
          display: none !important;
        }
        /* Hide the specific "Account" header text if class lookup fails */
        .cl-headerTitle, .cl-headerSubtitle {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
