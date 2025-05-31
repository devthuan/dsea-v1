import CandlestickVolume from "@/components/charts/CandlestickVolume/CandlestickVolume";
import ChartWithDrawingTools from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
import CandlestickHoang from "@/components/TestCandleStrick/CandlestickHoang";
import {
  candleStrickService,
  getProxyAddress,
} from "@/services/candleStrick/candleStrickService";
import { candleStrickServiceHoang } from "@/services/candleStrick/candleStrickServiceHoang";
// import ChartWithDrawingToolbar from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";

import React, { useRef, useEffect, useState } from "react";

const TestHoang = () => {
  const [dataCandle, setDataCandle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await candleStrickService.fetchData();
        console.log("Fetched result:", result); // Check what you're getting
        setDataCandle(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Log the current state to verify updates (this will show previous state until next render)
  useEffect(() => {
    console.log("Current dataCandle state:", dataCandle);
  }, [dataCandle]);

  return (
    <div className="">
      <CandlestickVolume data={dataCandle} />
    </div>
  );
};

export default TestHoang;
