import CandlestickVolume from "@/components/charts/CandlestickVolume/CandlestickVolume";
import ChartWithDrawingTools from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
import {
  candleStrickService,
  getProxyAddress,
} from "@/services/candleStrick/candleStrickService";
// import ChartWithDrawingToolbar from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { images } from "@/assets";

import React, { useRef, useEffect, useState } from "react";
import { calculateTimeKey } from "@/util/formatNameKeySMC";

const Test = () => {
  const [dataCandle, setDataCandle] = useState([]);
  const [chain, setChain] = useState("All Chain");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chainOptions = [
    { id: "1s", name: "1s" },
    { id: "1m", name: "1m" },
    { id: "3m", name: "3m" },
    { id: "5m", name: "5m" },
    { id: "15m", name: "15m" },
    { id: "30m", name: "30m" },
    { id: "1h", name: "1h" },
    { id: "2h", name: "2h" },
    { id: "4h", name: "4h" },
    { id: "6h", name: "6h" },
    { id: "8h", name: "8h" },
    { id: "12h", name: "12h" },
    { id: "1d", name: "1d" },
    { id: "3d", name: "3d" },
    { id: "1w", name: "1w" },
    { id: "1M", name: "1M" },
  ];

  const handleChainSelect = (selectedChain) => {
    setChain(selectedChain.name);
    setIsDropdownOpen(false);
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    console.log("Selected chain:", selectedChain.name);
    console.log("Current timestamp:", timestamp);
    console.log(calculateTimeKey(selectedChain.name, "1s", 0));

  };

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
      <Select className="cursor-pointer mb-3">
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chainOptions?.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  value={item.name}
                  className="flex items-center gap-2"
                  onClick={() => handleChainSelect(item)}
                >
                  {item.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-3">
        <CandlestickVolume data={dataCandle} />
      </div>
    </div>
  );
};

export default Test;
