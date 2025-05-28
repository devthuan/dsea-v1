import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
} from "lightweight-charts";
import { candleStrickServiceNhat } from "@/services/candleStrick/candleStrickServiceNhat";

const CandlestickNhat = ({ data }) => {
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
      localization: {
        locale: "vi-VN",
        dateFormat: "UTC dd/MM/yyyy ",
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
        top: 0.8,
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

      const logicalFrom = newRange.from;

      console.log("Logical from:", logicalFrom);
      console.log("Logical to:", newRange.to);

      // Nếu người dùng cuộn gần đầu biểu đồ
      if (logicalFrom < 5) {
        // Giả sử bạn có thể lấy thời gian đầu tiên hiện có để làm mốc load dữ liệu cũ
        const visibleTimeRange = chart.timeScale().getVisibleRange();
        if (!visibleTimeRange) return;

        const startTime = visibleTimeRange.from; // dạng Date hoặc timestamp
        const startTimestampMs =
          typeof startTime === "number"
            ? startTime * 1000
            : new Date(startTime).getTime();

        const fetchData = async () => {
          try {
            const result = await candleStrickServiceNhat.fetchDataOld(
              startTimestampMs
            );
            console.log("Fetched result >>>:", result);
            const formattedData = result.map((item) => {
              return {
                time: item.openTime / 1000, // chuyển sang giây
                open: parseFloat(item.open),
                high: parseFloat(item.high),
                low: parseFloat(item.low),
                close: parseFloat(item.close),
                value: parseFloat(item.quoteVolume),
              };
            });
            if (result && result.length > 0) {
              setDataCandle((prevData) => {
                const dataMap = new Map();

                // Thêm dữ liệu mới vào Map (nến mới ghi đè nến cũ nếu trùng time)
                [...formattedData, ...prevData].forEach((candle) => {
                  dataMap.set(candle.time, candle);
                });

                // Chuyển Map thành mảng và sắp xếp
                return Array.from(dataMap.values()).sort(
                  (a, b) => a.time - b.time
                );
              });
              // setDataCandle((prevData) => [...formattedData, ...prevData]);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };

        // fetchData();

        console.log("Đang load thêm dữ liệu lịch sử...");
      }
    });

    chart.timeScale().fitContent();
    candleSeriesRef.current = candlestickSeries;
    histogramSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
    };
  }, []);

  // init candle for chart | https
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=300"
  //       );

  //       const candles = response.data.map((item) => ({
  //         time: Math.floor(item[0] / 1000), // Convert to seconds
  //         open: parseFloat(item[1]),
  //         high: parseFloat(item[2]),
  //         low: parseFloat(item[3]),
  //         close: parseFloat(item[4]),
  //         value: parseFloat(item[7]),
  //       }));

  //       setDataCandle(candles);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // init data from smart contract
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candles = data.map((item) => ({
          time: item.openTime / 1000, // chuyển sang giây
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
          value: parseFloat(item.quoteVolume),
        }));

        console.log("check candle: ", candles);

        setDataCandle(candles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

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

  // real-time socket binance updates
  // useEffect(() => {
  //   const socket = new WebSocket(
  //     "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
  //   );
  //   socketRef.current = socket;

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data).k;
  //     const newCandle = {
  //       time: Math.floor(data.t), // Convert to seconds // open time
  //       open: parseFloat(data.o),
  //       high: parseFloat(data.h),
  //       low: parseFloat(data.l),
  //       close: parseFloat(data.c),
  //       value: parseFloat(data.v),
  //     };

  //     if (
  //       !lastCandleRef.current ||
  //       lastCandleRef.current.time !== newCandle.time
  //     ) {
  //       // tạo nến mới
  //       if (lastCandleRef.current && data.x) {
  //         setDataCandle((prev) => [...prev, lastCandleRef.current]);
  //       }
  //       lastCandleRef.current = newCandle;
  //     } else {
  //       // cập nhật dữ liệu nến
  //       lastCandleRef.current = newCandle;
  //       candleSeriesRef.current.update(newCandle);
  //       histogramSeriesRef.current.update({
  //         time: newCandle.time,
  //         value: newCandle.value * newCandle.open,
  //         color: newCandle.close >= newCandle.open ? "#26a69a" : "#ef5350",
  //       });
  //     }
  //   };

  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.close();
  //     }
  //   };
  // }, []);

  // real-time smart contract updates
  useEffect(() => {
    const listData = async () => {
      await candleStrickServiceNhat.listeningEvent({
        callback: (newData) => {
          console.log(newData);
          const newCandle = {
            time: newData.openTime / 1000, // chuyển sang giây
            open: parseFloat(newData.open),
            high: parseFloat(newData.high),
            low: parseFloat(newData.low),
            close: parseFloat(newData.close),
            value: parseFloat(newData.volume),
          };

          if (
            !lastCandleRef.current ||
            lastCandleRef.current.time !== newCandle.time
          ) {
            // tạo nến mới
            if (lastCandleRef.current && newData.isClosed) {
              setDataCandle((prev) => [...prev, lastCandleRef.current]);
            }
            lastCandleRef.current = newCandle;
          } else {
            // cập nhật dữ liệu nến
            lastCandleRef.current = newCandle;
            candleSeriesRef.current.update(newCandle);
            histogramSeriesRef.current.update({
              time: newCandle.time,
              value: newCandle.value * newCandle.open,
              color: newCandle.close >= newCandle.open ? "#26a69a" : "#ef5350",
            });
          }
        },
      });
    };
    //

    listData();
  }, []);

  // event listen smart contract
  // useEffect(() => {
  //   let isMounted = true;
  //   let unsubscribe = () => {};

  //   const handleNewCandleData = (newData) => {
  //     if (!isMounted) return;

  //     console.log("New candle data:", newData);

  //     try {
  //       const newCandle = {
  //         time: Math.floor(newData.t), // Using newData instead of data
  //         open: parseFloat(newData.o),
  //         high: parseFloat(newData.h),
  //         low: parseFloat(newData.l),
  //         close: parseFloat(newData.c),
  //         value: parseFloat(newData.v),
  //       };

  //       if (
  //         !lastCandleRef.current ||
  //         lastCandleRef.current.time !== newCandle.time
  //       ) {
  //         // New candle
  //         if (lastCandleRef.current && newData.isClosed) {
  //           setDataCandle((prev) => [...prev, lastCandleRef.current]);
  //         }
  //         lastCandleRef.current = newCandle;
  //       } else {
  //         // Update existing candle
  //         lastCandleRef.current = newCandle;

  //         // Batch updates if possible
  //         candleSeriesRef.current?.update(newCandle);

  //         const volumeValue = newCandle.value * newCandle.open;
  //         const volumeColor =
  //           newCandle.close >= newCandle.open ? "#26a69a" : "#ef5350";

  //         histogramSeriesRef.current?.update({
  //           time: newCandle.time,
  //           value: volumeValue,
  //           color: volumeColor,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error processing candle data:", error);
  //     }
  //   };

  //   const subscribeToCandleData = async () => {
  //     try {
  //       unsubscribe = await candleStrickService.listeningEvent({
  //         callback: handleNewCandleData,
  //       });
  //     } catch (error) {
  //       console.error("Error subscribing to candle data:", error);
  //     }
  //   };

  //   subscribeToCandleData();

  //   return () => {
  //     isMounted = false;
  //     unsubscribe();
  //   };
  // }, []); // Empty dependency array means this runs once on mount

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

export default CandlestickNhat;
