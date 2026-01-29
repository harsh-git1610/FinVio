"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

interface RevenueLineChartProps {
    data: Array<{ month: string; revenue: number }>;
}

const chartConfig = {
    revenue: {
        label: "Revenue (INR)",
        color: "hsl(221, 83%, 53%)", // Bright blue color
    },
} satisfies ChartConfig

export function RevenueLineChart({ data }: RevenueLineChartProps) {
    return (
        <div className="w-full">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <LineChart
                    accessibilityLayer
                    data={data}
                    margin={{
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                        cursor={{ stroke: 'hsl(221, 83%, 53%)', strokeWidth: 1, strokeDasharray: '5 5' }}
                        content={<ChartTooltipContent
                            hideLabel
                            formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                        />}
                    />
                    <Line
                        dataKey="revenue"
                        type="monotone"
                        stroke="hsl(221, 83%, 53%)"
                        strokeWidth={3}
                        dot={{
                            fill: "hsl(221, 83%, 53%)",
                            r: 5,
                            strokeWidth: 2,
                            stroke: "#fff"
                        }}
                        activeDot={{
                            r: 7,
                            strokeWidth: 2,
                        }}
                    />
                </LineChart>
            </ChartContainer>
        </div>
    )
}
