import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const dataPieChart = [
  { name: "$ETH", value: 36.9, color: "#4CAF50" },
  { name: "$DOGE", value: 15.7, color: "#E91E63" },
  { name: "$SHIB", value: 13.4, color: "#FFC107" },
  { name: "$BONK", value: 13.1, color: "#2196F3" },
  { name: "$PEPE", value: 12.2, color: "#FF9800" },
  { name: "$MEOW", value: 10.6, color: "#673AB7" },
];

const CryptoPieChart = ({ data = dataPieChart || [], totalValue = "10", height = "100%" }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ fontSize: "12px" }}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      {/* Tổng giá trị ở giữa */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#666",
        }}
      >
        Total Value <br />
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          ${totalValue}M
        </span>
      </div>
    </div>
  );
};

export default CryptoPieChart;
