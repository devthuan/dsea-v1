import React, { useEffect, useRef } from "react";
import { CandlestickSeries, createChart } from "lightweight-charts";

const ChartWithDrawingTools = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        backgroundColor: "#ffffff",
        textColor: "#333",
      },
      crosshair: {
        mode: 1, // CrosshairMode.Normal
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
    });

    chartRef.current = chart;

    // Thêm series dữ liệu
    const candleSeries = chart.addSeries(CandlestickSeries);
    candleSeries.setData([
      { time: "2023-01-01", open: 100, high: 110, low: 90, close: 105 },
      { time: "2023-01-02", open: 105, high: 115, low: 100, close: 110 },
      // Thêm dữ liệu khác...
    ]);

    // Kích hoạt chế độ vẽ
    chart.applyOptions({
      handleScale: {
        mouseWheel: true,
        pinch: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
    });

    return () => {
      chart.remove();
    };
  }, []);

  // Hàm kích hoạt chế độ vẽ
  const enableDrawingMode = (tool) => {
    if (chartRef.current) {
      // Đây là nơi bạn sẽ triển khai logic vẽ
      console.log(`Kích hoạt chế độ vẽ: ${tool}`);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => enableDrawingMode("trendline")}>
          Đường xu hướng
        </button>
        <button onClick={() => enableDrawingMode("horizontal")}>
          Đường ngang
        </button>
        <button onClick={() => enableDrawingMode("rectangle")}>
          Hình chữ nhật
        </button>
      </div>
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
};

export default ChartWithDrawingTools;
