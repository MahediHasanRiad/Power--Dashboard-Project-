"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "JAN", registrations: 4500 },
  { month: "FEB", registrations: 5200 },
  { month: "MAR", registrations: 4800 },
  { month: "APR", registrations: 6800 },
  { month: "MAY", registrations: 8500 },
  { month: "JUN", registrations: 9800 },
]

const chartConfig = {
  registrations: {
    label: "New Registrations",
    color: "#dd9e40", 
  },
} satisfies ChartConfig

export function UserGrowthChart() {
  return (
    <Card className="bg-card-bg-0 border-none text-white">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="grid gap-1">
          <CardTitle className="text-2xl font-bold">User Growth</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            6-Month trajectory analysis
          </CardDescription>
        </div>
        {/* Legend matching Screenshot 2026-05-14 120506.png */}
        <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
          <span className="h-1 w-3 rounded-full bg-[#D4A017]" />
          New Registrations
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} stroke="#1A1A1A" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              className="text-[10px] font-bold"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[10px]"
              ticks={[1000, 5000, 6000, 10000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="registrations"
              fill="var(--color-registrations)"
              radius={[2, 2, 0, 0]}
              barSize={60}
              fillOpacity={0.6} // Gives it that slightly muted gold look
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}