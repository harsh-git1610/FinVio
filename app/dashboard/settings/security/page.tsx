"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SecurityPage() {
  return (
    <UserProfile
      routing="path"
      path="/settings"
      appearance={{
        elements: {
          navbar: "hidden",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
        },
      }}
    />
  );
}
