
export function Trust() {
    return (
        <section className="py-24 border-t border-white/5">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex flex-col items-center justify-center gap-8 text-center sm:flex-row sm:justify-between">
                    <span className="text-sm font-medium text-neutral-500">Trusted by modern freelancers</span>
                    <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                        {/* Placeholders for logos, using text for now to keep it minimal/clean as requested */}
                        <span className="text-lg font-bold text-white">Acme Inc.</span>
                        <span className="text-lg font-bold text-white">Capsule</span>
                        <span className="text-lg font-bold text-white">Spherule</span>
                        <span className="text-lg font-bold text-white">GlobalBank</span>
                        <span className="text-lg font-bold text-white">Nietzsche</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
