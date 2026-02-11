import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ValueProposition } from "@/components/landing/value-proposition";
import { Features } from "@/components/landing/features";
import { AIAssistant } from "@/components/landing/ai-assistant";
import { Analytics } from "@/components/landing/analytics";
import { Trust } from "@/components/landing/trust";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      <Hero />
      <Trust />
      <ValueProposition />
      <Features />
      <AIAssistant />
      <Analytics />
      <CTA />
      <Footer />
    </main>
  );
}
