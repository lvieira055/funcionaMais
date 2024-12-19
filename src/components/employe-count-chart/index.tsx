"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface ChartProps {
  title: string
  description?: string
  data: { branch: string; funcionarios: number; fill?: string }[] // Adicionei o campo `fill` para associar cores
  footer?: string
}

export default function Chart({ title, description, data, footer }: ChartProps) {
  // Configuração de cores para os ramos
  const colorList = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  // Atualizando os dados para incluir as cores
  const enhancedData = data.map((item, index) => ({
    ...item,
    fill: colorList[index % colorList.length],
  }))

  const chartConfig = {
    funcionarios: {
      label: "Funcionários",
    },
    ...enhancedData.reduce((acc, curr) => {
      acc[curr.branch] = {
        label: curr.branch,
        color: curr.fill!,
      }
      return acc
    }, {} as Record<string, { label: string; color: string }>)
  } satisfies ChartConfig

  return (
    <Card className="container min-w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={enhancedData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="branch"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="funcionarios" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="funcionarios"
              layout="vertical"
              radius={5}
              isAnimationActive
              // Adicionando a configuração dinâmica de cores
              fill={(entry) => entry.fill!}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">{footer}</div>
      </CardFooter>
    </Card>
  )
}
