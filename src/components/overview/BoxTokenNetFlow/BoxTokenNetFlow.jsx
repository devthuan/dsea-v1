import { useState } from "react";
import NetFlowChart from "../../charts/NetFlowChart/NetFlowChart";
import TabButtons from "../../TabButtons/TabButtons";
import CustomPieChart from "../../charts/PieChart/PieChart";
import AccumulationChart from "../../charts/LineChartReChart/AccumulationChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BoxTokenNetFlow = () => {
  const [activeTab, setActiveTab] = useState("netflow");
  const [activeTabPieChart, setActiveTabPieChart] = useState("24h");

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

  const tabsData = [
    { id: "netflow", label: "Net Inflow/Outflow" },
    { id: "exchange", label: "On-chain Exchange Flow" },
    { id: "whaleStatus", label: "Whales' status" },
    { id: "accumulation", label: "Whale accumulation trend" },
  ];

  const dataRangeSell = [
    { label: "Strong Sell", rank: 1 },
    { label: "Sell", rank: 2 },
    { label: "Neutral", rank: 3 },
    { label: "Buy", rank: 4 },
    { label: "Strong Buy", rank: 5 },
  ];

  const getColorByRank = (rank) => {
    switch (rank) {
      case 1:
        return "bg-[#d73027]";
      case 2:
        return "bg-[#fc8d59]";
      case 3:
        return "bg-[#dddddd]";
      case 4:
        return "bg-[#A5D6A7]";
      case 5:
        return "bg-[#388E3C]";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="w-full h-full rounded-[32px] p-[24px] bg-whi  te">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-black text-2xl font-semibold ">
          Whales' Analytics
        </h1>
      </div>

      <Tabs defaultValue="account" className="w-full ">
        <TabsList className={"mb-[30px] "}>
          <TabsTrigger className={"p-4"} value="netflow">
            Net inflow/outflow
          </TabsTrigger>
          <TabsTrigger className={"p-4"} value="onchain">
            On-chain exchange flow
          </TabsTrigger>
          <TabsTrigger className={"p-4"} value="whaleStatus">
            Whale's whaleStatus
          </TabsTrigger>
          <TabsTrigger className={"p-4"} value="accumulation">
            Whale accumulation trend
          </TabsTrigger>
        </TabsList>
        <TabsContent value="netflow">
          <NetFlowChart data={btcData} />
        </TabsContent>
        <TabsContent value="onchain">
          <NetFlowChart data={btcData} />
        </TabsContent>
        <TabsContent value="whaleStatus">
          <WhaleStatusTab
            activeTab={activeTabPieChart}
            onTabChange={setActiveTabPieChart}
          />
        </TabsContent>
        <TabsContent value="accumulation">
          <AccumulationChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const WhaleStatusTab = ({ activeTab, onTabChange }) => {
  const tabsDataPieChart = [
    { id: "24h", label: "24h" },
    { id: "7day", label: "7 day" },
    { id: "14day", label: "14 day" },
  ];

  return (
    <div className="grid grid-cols-3 justify-between">
      <div className="col-span-2 flex justify-center items-center">
        <CustomPieChart width={800} height={600} outerRadius={150} />
      </div>

      <div className="w-[404px] h-[595px] relative overflow-hidden">
        <div className="absolute left-0 top-[3px] w-[402px] h-[592px] bg-[#d9d9d9]/40 rounded-[20px]" />

        <div className="absolute left-[32px] top-[35px] inline-flex justify-start items-center gap-2">
          {/* <TabButtons
            tabs={tabsDataPieChart}
            activeTab={activeTab}
            onTabClick={onTabChange}
            tabType="type2"
          /> */}
        </div>

        <div className="absolute left-[32px] top-[105px] flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="text-black text-2xl font-normal font-['Poppins'] leading-[48px]">
              Whales sold at a loss
            </div>
            <div className="text-black text-[64px] font-semibold font-['Poppins'] leading-[48px]">
              8%
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-black text-2xl font-normal font-['Poppins'] leading-[48px]">
              Whales sold at a profit
            </div>
            <div className="text-black text-[64px] font-semibold font-['Poppins'] leading-[48px]">
              12%
            </div>
          </div>
        </div>

        <div className="absolute left-[32px] top-[401px] w-[338px] h-0 outline outline-offset-[-1px] outline-[#4d4d4d]" />

        <div className="absolute left-[32px] top-[417px] w-[338px] text-black text-xs font-normal font-['Poppins']">
          Whales have sold at a loss or gained a profit over 24 hours, 7 days,
          and 14 days. This shows the activities of all whales at the moment.
        </div>
      </div>
    </div>
  );
};

export default BoxTokenNetFlow;
