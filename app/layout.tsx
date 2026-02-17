import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import Image from "next/image"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://invoice-gen-nu.vercel.app"),
  title: {
    default: "FinVio - AI Invoice Generator",
    template: "%s | FinVio",
  },
  description: "Professional invoice generator for freelancers and small businesses. Create, track, and manage invoices with AI assistance.",
  keywords: ["invoice generator", "freelance invoicing", "ai finance", "small business tools"],
  authors: [{ name: "Harsh" }],
  creator: "Harsh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "FinVio - AI Invoice Generator",
    description: "Professional invoice generator for freelancers and small businesses.",
    siteName: "FinVio",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinVio - AI Invoice Generator",
    description: "Professional invoice generator for freelancers and small businesses.",
    creator: "@harsh",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
