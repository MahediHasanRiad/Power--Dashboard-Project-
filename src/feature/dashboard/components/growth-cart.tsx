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

interface GrowthDataItem {
  label: string
  count: number
}

interface UserActivityChartProps {
  growth: GrowthDataItem[] | null | undefined 
}

const chartConfig = {
  count: {
    label: "Registrations",
    color: "#dd9e40", 
  },
} satisfies ChartConfig

export function UserGrowthChart({ growth }: UserActivityChartProps) {
  if (!growth) {
    return (
      <Card className="bg-card-bg-0 border-none text-white">
        <div className="h-[380px] flex items-center justify-center text-sm text-[#A3A3A3]">
          Loading activity data...
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card-bg-0 border-none text-white">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="grid gap-1">
          <CardTitle className="text-2xl font-bold">Weekly Activity</CardTitle>
          <CardDescription className="text-[#A3A3A3]">
            User registration trajectory for the week
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
          <span className="h-1 w-3 rounded-full bg-[#D4A017]" />
          New Registrations
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={growth ?? []} margin={{ left: -20 }}>
            <CartesianGrid vertical={false} stroke="#1A1A1A" />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="text-[10px] font-bold"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-[10px]"
              allowDecimals={false}
            />
            
            {/* ── FIX: Added the cursor property here ── */}
            <ChartTooltip 
              cursor={{ fill: '#ffffff', opacity: 0.08 }} 
              content={<ChartTooltipContent />} 
            />
            
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[2, 2, 0, 0]}
              barSize={40}
              fillOpacity={0.6}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}