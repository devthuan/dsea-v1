import React, { useState } from "react";
import { Treemap, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatLargeNumber } from "@/util/formatNumber";


const dataTest = [
  {
    name: "BTC",
    price: 33058.73,
    volume_24h: 1125808000,
    market_cap: 1670000000000,
    change_percent: 2.5,
    change_percent_1000: 2500,
    category: "POW",
    last_updated: "1743575040000",
    high_24h: 33500.0,
    low_24h: 32800.0,
  },
  {
    name: "ETH",
    price: 33058.73,
    volume_24h: 1125808000,
    market_cap: 1570000000000,
    change_percent: -2.5,
    change_percent_1000: 2500,
    category: "POW",
    last_updated: "1743575040000",
    high_24h: 33500.0,
    low_24h: 32800.0,
  },
  {
    name: "ETH",
    price: 33058.73,
    volume_24h: 1125808000,
    market_cap: 1570000000000,
    change_percent: -2.5,
    change_percent_1000: 2500,
    category: "POW",
    last_updated: "1743575040000",
    high_24h: 33500.0,
    low_24h: 32800.0,
  },
  {
    name: "ETH",
    price: 33058.73,
    volume_24h: 1125808000,
    market_cap: 1570000000000,
    change_percent: -2.5,
    change_percent_1000: 2500,
    category: "POW",
    last_updated: "1743575040000",
    high_24h: 33500.0,
    low_24h: 32800.0,
  },
  {
    name: "ETH",
    price: 33058.73,
    volume_24h: 1125808000,
    market_cap: 1570000000000,
    change_percent: -2.5,
    change_percent_1000: 2500,
    category: "POW",
    last_updated: "1743575040000",
    high_24h: 33500.0,
    low_24h: 32800.0,
  },
];

const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  name,
  value,
  data,
  change_percent,
}) => {
  // const fillColor = depth < 2 ? COLORS[index % COLORS.length] : "none";
  // const fillColor = value > 2000 ? "#0000FF" : "#FF0000";
  let fillColor = "black"; // Default fill color

  if (depth === 1) {
    fillColor = change_percent > 0 ? "#2C954B" : "#FF3A3D";
  }
  const strokeWidth = 2 / (depth + 1e-10);
  const strokeOpacity = 1 / (depth + 1e-10);

  // Tính toán kích thước phông chữ dựa trên width, height của box
  const fontSize = Math.min(width / 5, height / 3, 20);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: fillColor, stroke: "black", strokeWidth, strokeOpacity }}
      />
      {depth === 1 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
          >
            <tspan x={x + width / 2} dy={-fontSize * 0.5}>
              {name}
            </tspan>
            <tspan x={x + width / 2} dy={fontSize}>
              {change_percent}%
            </tspan>
          </text>
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={fontSize}
            fillOpacity={0.9}
          ></text>
        </>
      )}
    </g>
  );
};




// Custom Tooltip Component
const CustomTooltipContent = ({ active, payload }) => {
  // For preview purposes, we'll use useState to toggle the sample tooltip
  const [isVisible, setIsVisible] = useState(true);

  // In real implementation, this would be:
  const data = payload[0] ? payload[0].payload : null;

  // Real implementation would use: const data = payload[0]?.payload;

  if (isVisible && data) {
    const isPositive = parseFloat(data.change_percent) >= 0;


    return (
      <div className="bg-white/60 p-3 shadow-lg border border-gray-200 rounded-lg max-w-xs">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-lg text-gray-800">{data.name}</h3>
          <div
            className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
              isPositive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
            {data.change_percent}
          </div>
        </div>

        <div className="mb-1">
          <div className="text-sm text-gray-500 mb-1">Current Price</div>
          <div className="text-xl font-semibold text-gray-900">
            {formatCurrency(data.price)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-1">
          <div>
            <div className="text-xs text-gray-500 mb-1">24h Volume</div>
            <div className="font-medium text-gray-800">
              ${formatLargeNumber(data.volume_24h)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Market Cap</div>
            <div className="font-medium text-gray-800">
              ${formatLargeNumber(data.market_cap)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const TreeMapChart = ({ data = dataTest, width = "100%", height = 417 }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      <Treemap
        data={dataTest}
        dataKey="change_percent_1000"
        fill="#8884d8"
        content={<CustomizedContent data={data} />}
        isAnimationActive={false}
      >
        <Tooltip content={CustomTooltipContent} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreeMapChart;
