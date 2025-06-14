import { useEffect, useState } from "react";
import NetFlowChart from "../../charts/NetFlowChart/NetFlowChart";
import TabButtons from "../../TabButtons/TabButtons";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import CandlestickVolume from "../../charts/CandlestickVolume/CandlestickVolume";

import FundingRateChart from "../../charts/LineChartReChart/FundingRateChart";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandlestickHoang from "@/components/TestCandleStrick/CandlestickHoang";
import { candleStrickServiceHoang } from "@/services/candleStrick/candleStrickServiceHoang";

const btcData = [
  { name: "2024-01-01", inflow: 32000, outflow: 28000, price: 42000 },
  { name: "2024-02-01", inflow: 35000, outflow: 37000, price: 45000 },
  { name: "2024-03-01", inflow: 40000, outflow: 39000, price: 47000 },
  { name: "2024-04-01", inflow: 42000, outflow: 45000, price: 48000 },
  { name: "2024-05-01", inflow: 46000, outflow: 43000, price: 50000 },
  { name: "2024-06-01", inflow: 50000, outflow: 52000, price: 91000 },
  { name: "2024-07-01", inflow: 54000, outflow: 51000, price: 83000 },
  { name: "2024-08-01", inflow: 58000, outflow: 60000, price: 55000 },
  { name: "2024-09-01", inflow: 62000, outflow: 59000, price: 77000 },
  { name: "2024-10-01", inflow: 66000, outflow: 68000, price: 59000 },
  { name: "2024-11-01", inflow: 70000, outflow: 72000, price: 61000 },
  { name: "2024-12-01", inflow: 75000, outflow: 73000, price: 63000 },
  { name: "2025-01-01", inflow: 32000, outflow: 28000, price: 42000 },
  { name: "2025-02-01", inflow: 35000, outflow: 37000, price: 45000 },
  { name: "2025-03-01", inflow: 40000, outflow: 39000, price: 47000 },
  { name: "2025-04-01", inflow: 42000, outflow: 45000, price: 48000 },
  { name: "2025-05-01", inflow: 46000, outflow: 43000, price: 50000 },
  { name: "2025-06-01", inflow: 50000, outflow: 52000, price: 91000 },
  { name: "2025-07-01", inflow: 54000, outflow: 51000, price: 83000 },
  { name: "2025-08-01", inflow: 58000, outflow: 60000, price: 55000 },
  { name: "2025-09-01", inflow: 62000, outflow: 59000, price: 77000 },
  { name: "2025-10-01", inflow: 66000, outflow: 68000, price: 59000 },
  { name: "2025-11-01", inflow: 70000, outflow: 72000, price: 61000 },
  { name: "2025-12-01", inflow: 75000, outflow: 73000, price: 63000 },
];

const BoxFOT = () => {

    const [dataCandle, setDataCandle] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await candleStrickServiceHoang.fetchData();
          console.log("Fetched result:", result); // Check what you're getting
          setDataCandle(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="w-full h-full  p-4 rounded-md shadow-sm border border-gray-200">
      <Tabs defaultValue="fundingRate" className="w-full ">
        <TabsList className=" mb-4 ">
          <TabsTrigger
            className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            value="fundingRate"
          >
            Funding rate
          </TabsTrigger>
          <TabsTrigger
            className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            value="openInterest"
          >
            Open interest
          </TabsTrigger>
          <TabsTrigger
            className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
            value="traingView"
          >
            Trading view
          </TabsTrigger>
        </TabsList>
        <TabsContent value="fundingRate" className={"p-4"}>
          <NetFlowChart data={btcData} />
        </TabsContent>
        <TabsContent value="openInterest">
          <FundingRateChart />
        </TabsContent>
        <TabsContent value="traingView">
          <CandlestickHoang data={dataCandle} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BoxFOT;
