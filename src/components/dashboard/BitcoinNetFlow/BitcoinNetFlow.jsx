"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StableCoinNetFlowChart from "@/components/charts/netFlowChart/StableCoinNetFlowChart";
import { bitcoinNetFlowServices } from "@/services/dashboard/bitcoinNetFlowService";
import BitcoinNetFlowChart from "@/components/charts/netFlowChart/BitcoinNetFlowChart";

// Mock chart component since the original isn't available
const StableCoinNetFlowChartComponent = ({ data, chartType, timePeriod }) => {
  const listMetric = [
    { name: "Flows", label: "flows", item: "btcPriceUSD" },
    { name: "AUM", label: "aum", item: "aumUSD" },
    { name: "Market cap", label: "marketcap", item: "marketCapUSD" },
    { name: "Volume", label: "volume", item: "volumeUSD" },
  ];

  const currentMetric = listMetric.find((item) => item.label === chartType);

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
      <BitcoinNetFlowChart data={data} keyLine={currentMetric} />
    </div>
  );
};

const BitcoinNetFlow = () => {
  const [activeTab, setActiveTab] = useState("day");
  const [activeChartType, setActiveChartType] = useState("flows");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabsData = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ];

  const tabsDataTypeChart = [
    { id: "flows", label: "Flows (USD)" },
    { id: "aum", label: "AUM" },
    { id: "marketcap", label: "Market Cap" },
    { id: "volume", label: "Volume" },
  ];

  // Fetch data based on current selection
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await bitcoinNetFlowServices.fetchData({
        // period: activeTab,
        type: activeChartType,
      });
      setChartData(result || []);
    } catch (error) {
      console.error(`Error fetching data for ${activeTab}:`, error);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle time period change
  const handleChooseTab = async (newTab) => {
    setActiveTab(newTab);
  };

  // Handle chart type change
  const handleChooseChartType = async (newChartType) => {
    setActiveChartType(newChartType);
  };

  // Fetch data whenever activeTab changes
  useEffect(() => {
    fetchData();
  }, [activeChartType]);

  // Real-time data updates
  useEffect(() => {
    const setupRealTimeUpdates = async () => {
      await bitcoinNetFlowServices.listeningEvent({
        callback: (newData) => {
          console.log("Real-time data:", newData);

          // Only update if the incoming data matches current period

          // if (period === activeTab) {
          setChartData((prevData) => {
            const existingIndex = prevData.findIndex(
              (item) => item.time === newData.time
            );

            if (existingIndex !== -1) {
              const updatedData = [...prevData];
              const existing = updatedData[existingIndex];

              updatedData[existingIndex] = {
                time: existing.time,
                inFlow: (existing.inFlow || 0) + (newData.inFlow || 0),
                outFlow: (existing.outFlow || 0) + (newData.outFlow || 0),
                btcPriceUSD:
                  (existing.btcPriceUSD || 0) + (newData.btcPriceUSD || 0),
                aumUSD: (existing.aumUSD || 0) + (newData.aumUSD || 0),
                marketCapUSD:
                  (existing.marketCapUSD || 0) + (newData.marketCapUSD || 0),
                volumeUSD: (existing.volumeUSD || 0) + (newData.volumeUSD || 0),
                netFlow: (existing.netFlow || 0) + (newData.netFlow || 0),
              };

              return updatedData;
            } else {
              return [...prevData, newData];
            }
          });

          // }
        },
      });
    };

    setupRealTimeUpdates();
  }, [activeTab]);

  return (
    <Card className="w-full h-full rounded-[15px]">
      <CardHeader className="pb-4">
        <div className="w-full flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-black font-medium text-lg">
              Bitcoin Exchange Net Flow
            </CardTitle>

            {/* Chart Type Tabs */}
            <Tabs value={activeChartType} onValueChange={handleChooseChartType}>
              <TabsList className="grid w-full grid-cols-4">
                {tabsDataTypeChart.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Time Period Tabs */}
          {/* <Tabs value={activeTab} onValueChange={handleChooseTab}>
            <TabsList className="grid w-full grid-cols-3">
              {tabsData.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className={"text-xs"}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs> */}
        </div>
      </CardHeader>

      <CardContent className={"px-0 mt-[-10px]"}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading chart data...</div>
          </div>
        ) : (
          <StableCoinNetFlowChartComponent
            data={chartData}
            chartType={activeChartType}
            timePeriod={activeTab}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BitcoinNetFlow;
