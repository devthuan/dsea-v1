/* eslint-disable max-classes-per-file */
import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";

const dataExample = [
  {
    name: "axis",
    children: [
      { name: "Axes", size: 1302 },
      { name: "Axis", size: 24593 },
      { name: "AxisGridLine", size: 652 },
      { name: "AxisLabel", size: 636 },
      { name: "CartesianAxes", size: 6703 },
    ],
  },
  {
    name: "controls",
    children: [
      { name: "AnchorControl", size: 2138 },
      { name: "ClickControl", size: 3824 },
      { name: "Control", size: 1353 },
      { name: "ControlList", size: 4665 },
      { name: "DragControl", size: 2649 },
      { name: "ExpandControl", size: 2832 },
      { name: "HoverControl", size: 4896 },
      { name: "IControl", size: 763 },
      { name: "PanZoomControl", size: 5222 },
      { name: "SelectionControl", size: 7862 },
      { name: "TooltipControl", size: 8435 },
    ],
  },
  {
    name: "data",
    children: [
      { name: "Data", size: 20544 },
      { name: "DataList", size: 19788 },
      { name: "DataSprite", size: 10349 },
      { name: "EdgeSprite", size: 3301 },
      { name: "NodeSprite", size: 19382 },
      {
        name: "render",
        children: [
          { name: "ArrowType", size: 698 },
          { name: "EdgeRenderer", size: 5569 },
          { name: "IRenderer", size: 353 },
          { name: "ShapeRenderer", size: 2247 },
        ],
      },
      { name: "ScaleBinding", size: 11275 },
      { name: "Tree", size: 7147 },
      { name: "TreeBuilder", size: 9930 },
    ],
  },
];

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

// Custom content component as a functional component
const CustomizedContent = ({
  root,
  depth,
  x,
  y,
  width,
  height,
  index,
  payload,
  colors,
  rank,
  name,
  data,
  size,
}) => {
  const dataChildren = data.map((item) => item.children);
  console.log(dataChildren);
  console.log(name);

  // Calculate dynamic font size based on cell dimensions
  const dynamicFontSize = Math.min(width, height) * 0.1; // Adjust the multiplier (0.3) as needed
  console.log(dynamicFontSize);
  const minFontSize = 7; // Minimum font size to ensure readability
  const maxFontSize = 16; // Maximum font size to prevent overflow
  const fontSize = Math.max(
    minFontSize,
    Math.min(maxFontSize, dynamicFontSize)
  );
  console.log(fontSize);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill:
            depth < 2
              ? colors[Math.floor((index / root.children.length) * 6)]
              : "#ffffff00",
          stroke: "#fff",
        }}
      />
      {depth === 1 && (
        <text
          x={x + width / 2}
          y={y + 15}
          textAnchor="middle"
          fill="red"
          fontWeight="bold"
          fontSize={fontSize} // Use dynamic font size
          dominantBaseline="hanging"
        >
          {name}
        </text>
      )}
      {depth === 1 && (
        <text
          x={x + 4}
          y={y + 18}
          // fill="#fff"
          fontSize={fontSize} // Use dynamic font size
          fillOpacity={0.9}
        >
          {index + 1}
        </text>
      )}
      {/* Display detailed info at depth 2 (children cells) */}
      {depth === 2 && width > 60 && height > 20 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#000"
          fontSize={fontSize} // Use dynamic font size
          className="fill-black"
          fontWeight="normal"
        >
          <tspan className="text-black" x={x + width / 2} dy={-fontSize * 0.5}>
            {name}
          </tspan>
          <tspan x={x + width / 2} dy={fontSize}>
            {size}
          </tspan>
        </text>
      )}
    </g>
  );
};

// Main component
const TreeMapChart2 = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        width={400}
        height={200}
        data={dataExample}
        dataKey="size"
        content={<CustomizedContent data={dataExample} colors={COLORS} />}
      />
    </ResponsiveContainer>
  );
};

export default TreeMapChart2;
