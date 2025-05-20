import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import axios from "axios";

const CandlestickVolume = () => {
  const candleSeriesRef = useRef(null);
  const histogramSeriesRef = useRef(null);
  const socketRef = useRef(null);
  const lastCandleRef = useRef(null);

  const [volume, setVolume] = useState(null);
  const [price, setPrice] = useState(null);
  const [dataCandle, setDataCandle] = useState([]);

  const formatVolume = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  // create chart
  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        timeVisible: true, // Hiển thị giờ và phút
        secondsVisible: true, // Không hiển thị giây
      },
    };

    const container = document.getElementById("container");
    const chart = createChart(container, chartOptions);

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.4,
      },
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.7,
        bottom: 0,
      },
    });

    chart.subscribeCrosshairMove((param) => {
      if (!param || !param.time) {
        setVolume(null);
        setPrice(null);
        return;
      }

      const volumeDataPoint = param.seriesData.get(volumeSeries);
      const priceDataPoint = param.seriesData.get(candlestickSeries);
      if (priceDataPoint) {
        setPrice({
          open: priceDataPoint.open,
          high: priceDataPoint.high,
          low: priceDataPoint.low,
          close: priceDataPoint.close,
        });
      }
      if (volumeDataPoint) {
        setVolume(formatVolume(volumeDataPoint.value));
      }
    });

    chart.timeScale().subscribeVisibleLogicalRangeChange((newRange) => {
      if (!newRange) return;

      const from = newRange.from;
      const to = newRange.to;

      // Giả sử bạn load thêm dữ liệu khi user kéo tới gần đầu biểu đồ
      if (from < 10) {
        console.log("Load thêm dữ liệu lịch sử...");
        // Gọi API để load thêm dữ liệu cũ
      }
    });


    chart.timeScale().fitContent();
    candleSeriesRef.current = candlestickSeries;
    histogramSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
    };
  }, []);

  // init candle for chart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=300"
        );

        const candles = response.data.map((item) => ({
          time: Math.floor(item[0] / 1000), // Convert to seconds
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
          value: parseFloat(item[7]),
        }));

        setDataCandle(candles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update chart with data
  useEffect(() => {
    if (
      dataCandle.length > 0 &&
      candleSeriesRef.current &&
      histogramSeriesRef.current
    ) {
      const candleData = dataCandle.map(({ time, open, high, low, close }) => ({
        time,
        open,
        high,
        low,
        close,
      }));
      const volumeData = dataCandle.map(({ time, value, open, close }) => ({
        time,
        value,
        color: close >= open ? "#26a69a" : "#ef5350",
      }));

      candleSeriesRef.current.setData(candleData);
      histogramSeriesRef.current.setData(volumeData);
    }
  }, [dataCandle]);

  // real-time updates
  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
    );
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data).k;
      const newCandle = {
        time: Math.floor(data.t / 1000), // Convert to seconds // open time
        open: parseFloat(data.o),
        high: parseFloat(data.h),
        low: parseFloat(data.l),
        close: parseFloat(data.c),
        value: parseFloat(data.v),
      };

      if (
        !lastCandleRef.current ||
        lastCandleRef.current.time !== newCandle.time
      ) {
        if (lastCandleRef.current && data.x) {
          setDataCandle((prev) => [...prev, lastCandleRef.current]);
        }
        lastCandleRef.current = newCandle;
      } else {
        lastCandleRef.current = newCandle;
        candleSeriesRef.current.update(newCandle);
        histogramSeriesRef.current.update({
          time: newCandle.time,
          value: newCandle.value * newCandle.open,
          color: newCandle.close >= newCandle.open ? "#26a69a" : "#ef5350",
        });
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div
      id="container"
      style={{ width: "100%", height: "400px", position: "relative" }}
    >
      {volume !== null && price !== null && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
            zIndex: "10",
          }}
        >
          Vol: {volume} | O: {price.open} | H: {price.high} | L: {price.low}
        </div>
      )}
    </div>
  );
};

export default CandlestickVolume;


