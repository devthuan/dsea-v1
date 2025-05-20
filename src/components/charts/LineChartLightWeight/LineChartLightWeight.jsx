import React, { useEffect, useRef } from "react";
import { createChart, HistogramSeries, LineSeries } from "lightweight-charts";

const dataExample = [
  { time: "2024-03-01", value: 45000 },
  { time: "2024-03-02", value: 46000 },
  { time: "2024-03-03", value: 45500 },
  { time: "2024-03-04", value: 47000 },
];

const LineChartLightWeight = ({
  data = dataExample,
  width = "100%",
  height = 400,
}) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Tạo biểu đồ
    const chart = createChart(chartContainerRef.current, {
      // width: 800,
      // height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
    });

    // Thêm series cho inflow (Xanh)
    const lineSeries = chart.addSeries(LineSeries, {
      color: "#2962FF",
      lineWidth: 2,
    });

    // Dữ liệu Line Chart
    lineSeries.setData(data);

    // Tự động resize khi thay đổi kích thước
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div ref={chartContainerRef} style={{ width: width, height: height }} />
  );
};

export default LineChartLightWeight;
