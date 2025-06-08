import { useState } from "react";
// import TabButtons from "../../TabButtons/TabButtons";
// import NetFlowChart from "../../charts/NetFlowChart/NetFlowChart";
// import CryptoPieChart from "../../charts/CryptPieChart/CryptPieChart";
import NetFlowChartCustom from "@/components/charts/netFlowChart/NetFlowChartCustom";
import CryptoPieChart from "@/components/charts/PieChart/CryptPieChart";
import TabButtons from "@/components/TabButtons/TabButtons";

const BoxChartHolding = () => {
  const [activeTab, setActiveTab] = useState("flows");
  const [activeTabChart, setActiveTabChart] = useState("asset");

  const tabsData = [
    { id: "flows", label: "Chain" },
    { id: "aum", label: "Asset" },
    { id: "marketCap", label: "Category" },
  ];
  const tabsDataChart = [
    { id: "asset", label: "Holding by asset" },
    { id: "trends", label: "Holding by trends" },
  ];

  const btcData = [
    { name: "Jan", inflow: 32000, outflow: 28000, price: 42000 },
    { name: "Feb", inflow: 35000, outflow: 37000, price: 45000 },
    { name: "Mar", inflow: 40000, outflow: 39000, price: 47000 },
    { name: "Apr", inflow: 42000, outflow: 45000, price: 48000 },
    { name: "May", inflow: 46000, outflow: 43000, price: 50000 },
    { name: "Jun", inflow: 50000, outflow: 52000, price: 51000 },
    { name: "Jul", inflow: 54000, outflow: 51000, price: 53000 },
    { name: "Aug", inflow: 58000, outflow: 60000, price: 55000 },
    { name: "Sep", inflow: 62000, outflow: 59000, price: 57000 },
    { name: "Oct", inflow: 66000, outflow: 68000, price: 59000 },
    { name: "Nov", inflow: 70000, outflow: 72000, price: 61000 },
    { name: "Dec", inflow: 75000, outflow: 73000, price: 63000 },
  ];

  const dataPieChart = [
    { name: "$ETH", value: 36.9, color: "#4CAF50" },
    { name: "$DOGE", value: 15.7, color: "#E91E63" },
    { name: "$SHIB", value: 13.4, color: "#FFC107" },
    { name: "$BONK", value: 13.1, color: "#2196F3" },
    { name: "$PEPE", value: 12.2, color: "#FF9800" },
    { name: "$MEOW", value: 10.6, color: "#673AB7" },
  ];
  const dataPieChart2 = [
    { name: "$ETH", value: 36.9, color: "#4CAF50" },
    { name: "$DOGE", value: 15.7, color: "#E91E63" },
  ];

  const totalValue = 2.7; // Tổng giá trị (triệu đô)

  return (
    <div className="w-full h-full p-[25px]">
      <div className="">
        <TabButtons
          tabs={tabsData}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          tabType="type3"
        />
      </div>
      <div className="w-full h-full grid grid-cols-2 relative">
        <div className="">
          <div className="absolute top-10 z-10">
            <TabButtons
              tabs={tabsDataChart}
              activeTab={activeTabChart}
              onTabClick={setActiveTabChart}
              tabType="type3"
            />
          </div>
          <div className="">
            {activeTabChart === "asset" && (
              <CryptoPieChart data={dataPieChart} totalValue={totalValue} />
            )}
            {activeTabChart === "trends" && (
              <CryptoPieChart data={dataPieChart2} totalValue={totalValue} />
            )}
          </div>
        </div>
        <div className="h-[500px]">
          <NetFlowChartCustom data={btcData} />
        </div>
      </div>
    </div>
  );
};

export default BoxChartHolding;
