import { CheckCircle2 } from "lucide-react";

export function Features() {
    const features = [
        { title: "AI Invoice Assistant", desc: "Draft invoices with natural language." },
        { title: "PDF Generation", desc: "Download sleek, compliant PDF invoices." },
        { title: "Multi-currency", desc: "Support for USD, EUR, GBP, and more." },
        { title: "Client Management", desc: "Save client details for one-click invoicing." },
        { title: "Revenue Analytics", desc: " Visualize your income trends instantly." },
        { title: "Secure Auth", desc: "Enterprise-grade security by Clerk." },
    ];

    return (
        <section className="py-24 bg-white/5 border-y border-white/5">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-2">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                                <CheckCircle2 className="h-5 w-5 text-neutral-500" />
                                {feature.title}
                            </h3>
                            <p className="pl-7 text-neutral-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
