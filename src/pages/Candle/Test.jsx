import CandlestickVolume from "@/components/charts/CandlestickVolume/CandlestickVolume";
import ChartWithDrawingTools from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
import { candleStrickService } from "@/services/candleStrick/candleStrickService";
// import ChartWithDrawingToolbar from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";

import React, { useRef, useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const fetchData = async () => {
      const result = await candleStrickService.fetchData();
      console.log(result);
      console.log("check");
    };

    fetchData();
  }, []);

  return <div className="">hello</div>;
};

export default Test;
