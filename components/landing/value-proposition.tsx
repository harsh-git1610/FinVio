
export function ValueProposition() {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Built for those who value clarity.
                    </h2>
                    <p className="mt-4 text-lg text-neutral-400">
                        No bloated features. No confusing menus. Just the tools you need to run your business, refined to perfection.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    {[
                        {
                            title: "Lightning Fast",
                            description:
                                "Generate professional invoices in under 10 seconds. Pre-filled clients, items, and tax settings.",
                        },
                        {
                            title: "AI Powered",
                            description:
                                "Ask questions about your finances in plain English. 'How much did I make last month?'",
                        },
                        {
                            title: "Privacy First",
                            description:
                                "Your financial data is encrypted and secure. We never sell your data to third parties.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center p-6 sm:p-8"
                        >
                            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-3 text-neutral-400 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
