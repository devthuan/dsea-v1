import CandlestickNhat from "@/components/TestCandleStrick/CandlestickNhat";
import { candleStrickServiceNhat } from "@/services/candleStrick/candleStrickServiceNhat";

import React, { useEffect, useState } from "react";

const TestNhat = () => {
  const [dataCandle, setDataCandle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await candleStrickServiceNhat.fetchData();
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
      <CandlestickNhat data={dataCandle} />
    </div>
  );
};

export default TestNhat;
