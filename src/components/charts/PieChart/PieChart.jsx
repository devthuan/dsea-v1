import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const RADIAN = Math.PI / 180;

const SampleData = [
  { name: "B", value: 300, fill: "#82ca9d" },
  { name: "A", value: 500, fill: "#14B8A6" },
];
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const xInner = cx + radius * Math.cos(-midAngle * RADIAN);
  const yInner = cy + radius * Math.sin(-midAngle * RADIAN);

  const labelDistance = 60; // 👈 chỉnh số này theo ý bạn

const xOuter = cx + (outerRadius + labelDistance) * Math.cos(-midAngle * RADIAN);
const yOuter = cy + (outerRadius + labelDistance) * Math.sin(-midAngle * RADIAN);

  // const xOuter = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
  // const yOuter = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

  const xStart = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const yStart = cy + outerRadius * Math.sin(-midAngle * RADIAN); // Độ dài đoạn ngang (gấp khúc sang trái/phải)

  return (
    <>
     <line
        x1={xStart}
        y1={yStart}
        x2={xOuter}
        y2={yOuter}
        stroke="black"
        strokeWidth={1.5}
      />
      <text
        x={xInner}
        y={yInner}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={35}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={xOuter }
        y={yOuter }
        fill="black"
        textAnchor={xOuter > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={18}
      >
        <tspan className="text-black" x={xOuter} dy="-0.6em">{`${(percent * 100).toFixed(0)}%`} whales are</tspan>
        <tspan x={xOuter} dy="1.2em">having unrealized gains</tspan>
      </text>
    </>
  );
};

const CustomPieChart = ({
  data = [],
  width = "100%",
  height = 400,
  outerRadius = 80,
  colors = ["#14B8A6", "#82ca9d", "#ffc658"],
}) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={SampleData}
          cx="50%"
          cy="50%"
          outerRadius={outerRadius}
          fill={colors[0]}
          label={renderCustomLabel}
        />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
        <Tooltip />
        {/* <Legend /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
