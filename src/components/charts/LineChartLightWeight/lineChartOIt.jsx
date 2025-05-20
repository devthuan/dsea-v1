import React, { useEffect, useRef } from "react";
import { AreaSeries, createChart, LineSeries } from "lightweight-charts";

const dataExample1 = [
  { time: "2024-03-01", value: 45000 },
  { time: "2024-03-02", value: 46000 },
  { time: "2024-03-03", value: 45500 },
  { time: "2024-03-04", value: 47000 },
];

const dataExample2 = [
  { time: "2024-03-01", value: 48000 },
  { time: "2024-03-02", value: 47000 },
  { time: "2024-03-03", value: 46500 },
  { time: "2024-03-04", value: 47500 },
];

const dataExample3 = [
  { time: "2024-03-01", value: 43000 },
  { time: "2024-03-02", value: 44000 },
  { time: "2024-03-03", value: 43500 },
  { time: "2024-03-04", value: 45000 },
];

const LineChartOI = ({
  data1 = dataExample1,
  data2 = dataExample2,
  data3 = dataExample3,
  width = "100%",
  height = 400,
}) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Tạo biểu đồ
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
    });

    // Thêm AreaSeries trước (vùng bóng đổ)
    const areaSeries1 = chart.addSeries(AreaSeries, {
      lineColor: "#2962FF",
      topColor: "rgba(41, 98, 255, 0.4)",
      bottomColor: "rgba(41, 98, 255, 0.1)",
    });
    areaSeries1.setData(data2);

    const areaSeries2 = chart.addSeries(AreaSeries, {
      lineColor: "#388E3C",
      topColor: "rgba(56, 142, 60, 0.4)",
      bottomColor: "rgba(56, 142, 60, 0.1)",
    });
    areaSeries2.setData(data3);

    // Thêm LineSeries SAU CÙNG để nó nằm trên cùng
    const lineSeries1 = chart.addSeries(LineSeries, {
      color: "#D32F2F",
      lineWidth: 2,
    });
    lineSeries1.setData(data1);

    // Tự động resize khi thay đổi kích thước
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data1, data2, data3]);

  return (
    <div ref={chartContainerRef} style={{ width: width, height: height }} />
  );
};

export default LineChartOI;
