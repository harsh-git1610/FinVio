"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { FadeIn } from "@/components/landing/fade-in";

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
        <section className="py-24 sm:py-32 bg-white border-y border-neutral-100">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <FadeIn>
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 mb-4">
                            See the bigger picture.
                        </h2>
                        <p className="text-lg text-neutral-600">
                            Track your financial growth with elegant, clutter-free charts.
                            Identify trends instantly.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-4 sm:p-8 shadow-xl shadow-neutral-100/50 relative overflow-hidden">
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e5e5e5", color: "#171717", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                                        itemStyle={{ color: "#171717" }}
                                        cursor={{ stroke: "#e5e5e5" }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-8 text-center border-t border-neutral-100 pt-8">
                            <div className="group-hover:text-blue-600 transition-colors">
                                <div className="text-3xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">$12.4k</div>
                                <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider mt-1">Revenue</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-neutral-900">+14%</div>
                                <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider mt-1">Growth</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-neutral-900">12</div>
                                <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider mt-1">Invoices</div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
