
"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { value: 400 },
    { value: 300 },
    { value: 600 },
    { value: 800 },
    { value: 500 },
    { value: 900 },
    { value: 700 },
    { value: 850 },
    { value: 1000 },
];

export function Analytics() {
    return (
        <section className="py-24 sm:py-32 border-t border-white/5">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
                        See the bigger picture.
                    </h2>
                    <p className="text-lg text-neutral-400">
                        Track your financial growth with elegant, clutter-free charts.
                        Identify trends instantly.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-neutral-900/50 p-4 sm:p-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none rounded-2xl" />
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#171717", borderColor: "#262626", color: "#ededed" }}
                                    itemStyle={{ color: "#ededed" }}
                                    cursor={{ stroke: "#404040" }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 4, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-8 text-center border-t border-white/5 pt-8">
                        <div>
                            <div className="text-2xl font-bold text-white">$12.4k</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Revenue</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">+14%</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Growth</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white">12</div>
                            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Invoices</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
