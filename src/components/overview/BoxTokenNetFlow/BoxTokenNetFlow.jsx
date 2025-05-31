import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";
import NetFlowChartCustom from "@/components/charts/netFlowChart/NetFlowChartCustom";
import StableCoinNetFlow from "@/components/dashboard/StableCoinNetFlow/StableCoinNetFlow";
import StableCoinNetFlowChart from "@/components/charts/netFlowChart/StableCoinNetFlowChart";
import CustomPieChart from "@/components/charts/PieChart/CustomPieChart";
import AccumulationChart from "@/components/charts/LineChartReChart/AccumulationChart";

// Mock components - replace with your actual components
const NetFlowChart = ({ data }) => (
  <div className="w-full h-96    rounded-xl flex items-center justify-center  ">
    <div className="text-center w-full h-full mb-10">
      <NetFlowChartCustom data={data} />
    </div>
  </div>
);

const CustomPieChartComponent = ({ width, height, outerRadius }) => (
  <div className="relative h-full w-full" >
    <div className="absolute inset-0   rounded-xl flex items-center justify-center ">
      <div className="text-center w-full h-full">
       
        <CustomPieChart/>
      </div>
    </div>
  </div>
);

const AccumulationChartComponent = () => (
  <div className="w-full h-96 rounded-xl flex items-center justify-center ">
    <div className="text-center w-full h-full">
     
      <AccumulationChart/>
    </div>
  </div>
);

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
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className=" mx-auto p-2">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Whales' Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600 ml-13">
            Comprehensive analysis of whale trading patterns and market
            movements
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 ">
          <Tabs defaultValue="netflow" className="w-full ">
            <TabsList className="h-auto grid w-full grid-cols-4 mb-2 bg-gray-100/50 p-1 rounded-xl">
              <TabsTrigger
                value="netflow"
                className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Net Flow</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="onchain"
                className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Exchange Flow</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="whaleStatus"
                className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Whale Status</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="accumulation"
                className="px-4 py-3 rounded-lg data-[state=active]:bg-[var(--primary)] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Accumulation</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="netflow" className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Net Inflow/Outflow Analysis
                </h3>
                <NetFlowChart data={btcData} />
              </div>
            </TabsContent>

            <TabsContent value="onchain" className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-2 border border-purple-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  On-chain Exchange Flow
                </h3>
                <NetFlowChart data={btcData} />
              </div>
            </TabsContent>

            <TabsContent value="whaleStatus" className="space-y-6">
              <WhaleStatusTab
                activeTab={activeTabPieChart}
                onTabChange={setActiveTabPieChart}
              />
            </TabsContent>

            <TabsContent value="accumulation" className="space-y-6">
              <div className=" rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Whale Accumulation Trend
                </h3>
                <AccumulationChartComponent />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const WhaleStatusTab = ({ activeTab, onTabChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("24h");

  const periods = [
    { id: "24h", label: "24 Hours", color: "blue" },
    { id: "7day", label: "7 Days", color: "purple" },
    { id: "14day", label: "14 Days", color: "green" },
  ];

  const stats = {
    "24h": { loss: 8, profit: 12 },
    "7day": { loss: 15, profit: 25 },
    "14day": { loss: 22, profit: 38 },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart Section */}
      <div className="lg:col-span-2">
        <div className=" rounded-xl p-6 border border-indigo-100 h-full flex items-center justify-center">
          <CustomPieChartComponent width={600} height={400} outerRadius={120} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="space-y-6">
        {/* Time Period Selector */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex gap-2">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`w-full p-3 rounded-lg text-center transition-all duration-200 ${
                  selectedPeriod === period.id
                    ? `bg-${period.color}-100 border-${period.color}-300 text-${period.color}-800 border-2`
                    : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="font-medium text-base">{period.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Whale Activity Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-6">
          <h4 className="text-lg font-semibold text-gray-800">
            Whale Activity
          </h4>

          {/* Loss Stats */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-gray-700 font-medium">
                Whales sold at a loss
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-red-600">
                {stats[selectedPeriod].loss}%
              </span>
              <span className="text-sm text-gray-500">of total volume</span>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Profit Stats */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-medium">
                Whales sold at a profit
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-green-600">
                {stats[selectedPeriod].profit}%
              </span>
              <span className="text-sm text-gray-500">of total volume</span>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>

          {/* Description */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-700 leading-relaxed">
              <strong>Analysis:</strong> Whales have sold at a loss or gained a
              profit over the selected timeframe. This shows the current
              activities and sentiment of all whale traders in the market.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTokenNetFlow;
