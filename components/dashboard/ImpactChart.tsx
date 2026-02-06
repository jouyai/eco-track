"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

interface ImpactChartProps {
  data: {
    day: string;
    emissions: number;
  }[];
}

export function ImpactChart({ data }: ImpactChartProps) {
  if (!data || data.length === 0) {
      return (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Belum ada data emisi minggu ini.
          </div>
      );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis 
            dataKey="day" 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
        />
        <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}kg`}
        />
        <Tooltip 
            cursor={false}
            position={{ y: 0 }}
            contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid hsl(var(--border))', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'hsl(var(--popover))',
                color: 'hsl(var(--popover-foreground))',
                zIndex: 50,
                padding: '8px 12px'
            }}
            labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px', fontSize: '12px' }}
            itemStyle={{ fontSize: '14px', fontWeight: 500 }}
            formatter={(value: number) => [`${value} kg CO2e`, 'Emisi']}
        />
        <Bar 
            dataKey="emissions" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]} 
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
