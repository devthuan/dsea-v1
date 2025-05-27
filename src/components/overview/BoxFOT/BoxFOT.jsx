import { useState } from "react";
import NetFlowChart from "../../charts/NetFlowChart/NetFlowChart";
import TabButtons from "../../TabButtons/TabButtons";
import ButtonCustom from "../../ButtonCustom/ButtonCustom";
import CandlestickVolume from "../../charts/CandlestickVolume/CandlestickVolume";

import FundingRateChart from "../../charts/LineChartReChart/FundingRateChart";


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
  const [activeTab, setActiveTab] = useState("flows");
  const tabsData = [
    { id: "flows", label: "Funding Rate" },
    { id: "aum", label: "Open Interest" },
    { id: "marketCap", label: "Trading view" },
  ];
  

  return (
    <div className="w-full h-full  rounded-[32px] p-[24px] bg-white">
      <div className="mt-4 ">
        <TabButtons
          tabs={tabsData}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          tabType="type4"
        />
      </div>

      <div className="mt-[27px]">
        {activeTab === "flows" && <NetFlowChart data={btcData} />}
        {activeTab === "aum" && <FundingRateChart/>}
        {activeTab === "marketCap" && (
          <CandlestickVolume
           
          />
        )}
      </div>
    </div>
  );
};

export default BoxFOT;
