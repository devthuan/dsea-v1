import CandlestickVolume from "@/components/charts/CandlestickVolume/CandlestickVolume";
import ChartWithDrawingTools from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
import { candleStrickService, getProxyAddress } from "@/services/candleStrick/candleStrickService";
// import ChartWithDrawingToolbar from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";

import React, { useRef, useEffect, useState } from "react";

 const Test = () => {
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
    fetchData();
    fetchData();
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

export default Test;
