"use client";

import React from "react";
import Image from "next/image";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

//supabase
import { getGradeTarget } from "@/lib/users";
import { createClient } from "@/utils/supabase/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData = {
  semester: number;
  IPK: number;
  Target: number;
}[];

const chartConfig = {} satisfies ChartConfig;

export default function PerformanceChart() {
  const [chartData, setChartData] = React.useState<ChartData>([]);

  React.useEffect(() => {
    async function getChartData() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      const user_id = data.user.id;
      const grade = await getGradeTarget(user_id);
      setChartData(grade as ChartData);
    }

    getChartData();
  }, []);

  return (
    <div className="w-full mt-2 rounded-2xl bg-white">
      <Card>
        <CardHeader>
          <CardDescription className="font-bold font-roboto text-black flex gap-2">
            <Image
              src={"/line-chart.png"}
              width={20}
              height={20}
              alt="line chart"
            />
            Grafik Indeks Prestasi per Semester
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="overflow-x-auto">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={true} horizontal={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                ticks={[1, 2, 3, 4]}
                interval={0}
                allowDecimals={true}
                tickFormatter={(value): string => {
                  if (value === 1) return "1.00";
                  if (value === 2) return "2.00";
                  if (value === 3) return "3.00";
                  if (value === 4) return "4.00";
                  return String(value);
                }}
                tick
                domain={[0, 5]}
              />
              <XAxis
                dataKey="semester"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value): string => {
                  if (value === 1) return "SMT1";
                  if (value === 2) return "SMT2";
                  if (value === 3) return "SMT3";
                  if (value === 4) return "SMT4";
                  if (value === 5) return "SMT5";
                  if (value === 6) return "SMT6";
                  if (value === 7) return "SMT7";
                  if (value === 8) return "SMT8";
                  return String(value);
                }}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent indicator="dot" className="bg-white" />
                }
              />
              <Line
                dataKey="Target"
                type="natural"
                fill="#0089ED"
                fillOpacity={0.4}
                stroke="#0089ED"
                strokeWidth={5}
                strokeLinecap="round"
                dot={false}
              />
              <Line
                dataKey="IPK"
                type="natural"
                fill="#E1057C"
                fillOpacity={0.4}
                stroke="#E1057C"
                strokeWidth={5}
                strokeLinecap="round"
                dot={false}
              />
            </LineChart>
            {/* #0089ED */}
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-roboto">
                Laporan Perkembangan Indeks Prestasi Semester
              </div>
              <span className="flex gap-2">
                <div className="flex">
                  <div className="mr-2 rounded-full h-4 w-4 bg-pink"></div>
                  <div className="font-roboto">Realisasi</div>
                </div>
                <div className="flex">
                  <div className="mr-2 rounded-full h-4 w-4 bg-blue"></div>
                  <div className="font-roboto">Target</div>
                </div>
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
