import React from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for demonstration
const mockData = [
  { time: "Jan", price: 45000, accumulation: 1200000 },
  { time: "Feb", price: 48000, accumulation: 1350000 },
  { time: "Mar", price: 52000, accumulation: 1500000 },
  { time: "Apr", price: 49000, accumulation: 1680000 },
  { time: "May", price: 55000, accumulation: 1850000 },
  { time: "Jun", price: 58000, accumulation: 2100000 },
  { time: "Jul", price: 62000, accumulation: 2350000 },
  { time: "Aug", price: 59000, accumulation: 2500000 },
];

const data = mockData.map((item, index) => ({
  ...item,
  index: index + 1,
}));

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
        <p className="font-semibold text-gray-800 mb-2">{`${label}`}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-800">
              {entry.name === "Price"
                ? `$${(entry.value / 1000).toFixed(0)}K`
                : `$${(entry.value / 1000000).toFixed(1)}M`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AccumulationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          {/* Enhanced gradient for area fill */}
          <linearGradient id="accumulationGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00BFA6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00A693" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow effect for the area */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Price line gradient */}
          <linearGradient id="priceGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#45B7D1" />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="#f0f0f0"
          strokeDasharray="2 2"
          vertical={false}
          opacity={0.7}
        />

        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          tick={{ fontSize: 12, fill: "#666" }}
          tickMargin={10}
        />

        <YAxis
          yAxisId="price"
          orientation="left"
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#666" }}
          width={60}
        />

        <YAxis
          yAxisId="accumulation"
          orientation="right"
          tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`}
          axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#666" }}
          width={60}
        />

        <Tooltip content={<CustomTooltip />} />

        {/* Area for whale accumulation */}
        <Area
          yAxisId="accumulation"
          type="monotone"
          dataKey="accumulation"
          stroke="#00BFA6"
          strokeWidth={2}
          fill="url(#accumulationGradient)"
          name="Whale Accumulation"
          filter="url(#glow)"
        />

        {/* Line for price */}
        <Line
          yAxisId="price"
          type="monotone"
          dataKey="price"
          stroke="url(#priceGradient)"
          strokeWidth={3}
          dot={{
            fill: "#FF6B6B",
            strokeWidth: 2,
            stroke: "#fff",
            r: 4,
          }}
          activeDot={{
            r: 6,
            stroke: "#FF6B6B",
            strokeWidth: 2,
            fill: "#fff",
          }}
          name="Price"
        />

        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          wrapperStyle={{
            paddingBottom: "20px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AccumulationChart;

