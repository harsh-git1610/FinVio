import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { ValueProposition } from "@/components/landing/value-proposition";
import { Features } from "@/components/landing/features";
import { AIAssistant } from "@/components/landing/ai-assistant";
import { Analytics } from "@/components/landing/analytics";
import { Trust } from "@/components/landing/trust";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Operations } from "@/components/landing/operations";
import { Comparison } from "@/components/landing/comparison";
import { Revenue } from "@/components/landing/revenue";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-blue-100 selection:text-blue-900 dark:bg-neutral-950 dark:text-neutral-50 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      <Navbar />
      <Hero />
      <div id="trust">
        <Trust />
      </div>
      <div id="how-it-works">
        <Operations />
      </div>
      <div id="value">
        <ValueProposition />
      </div>
      <Comparison />

      <div id="revenue">
        <Revenue />
      </div>
      <div id="features">
        <Features />
      </div>


      <CTA />
      <Footer />
    </main>
  );
}
