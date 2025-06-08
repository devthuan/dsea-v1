import { useState } from "react";

const BoxFearGear = () => {
  const dataExample = [
    { time: "2024-03-01", value: 45000 },
    { time: "2024-03-02", value: 46000 },
    { time: "2024-03-03", value: 45500 },
    { time: "2024-03-04", value: 47000 },
    { time: "2024-03-05", value: 45000 },
    { time: "2024-03-06", value: 46000 },
    { time: "2024-03-07", value: 45500 },
    { time: "2024-03-08", value: 47000 },
    { time: "2024-03-09", value: 49000 },
    { time: "2024-03-10", value: 57000 },
    { time: "2024-03-11", value: 77000 },
    { time: "2024-03-12", value: 27000 },
    { time: "2024-03-13", value: 97000 },
    { time: "2024-03-14", value: 77000 },
    { time: "2024-03-15", value: 67000 },
    { time: "2024-03-16", value: 47000 },
  ];

  const [activeTabTime, setActiveTabTime] = useState("1d");

  const tabsTime = [
    { id: "1h", label: "1H" },
    { id: "3h", label: "3H" },
    { id: "1d", label: "1D" },
    { id: "1w", label: "1W" },
    { id: "1m", label: "1M" },
  ];

  // Function to get color and label based on fear/greed value
  const getFearGreedInfo = (value) => {
    if (value >= 75)
      return {
        color: "text-red-500",
        bg: "bg-red-100",
        label: "Extreme Greed",
        ring: "ring-red-200",
      };
    if (value >= 55)
      return {
        color: "text-orange-500",
        bg: "bg-orange-100",
        label: "Greed",
        ring: "ring-orange-200",
      };
    if (value >= 45)
      return {
        color: "text-yellow-500",
        bg: "bg-yellow-100",
        label: "Neutral",
        ring: "ring-yellow-200",
      };
    if (value >= 25)
      return {
        color: "text-blue-500",
        bg: "bg-blue-100",
        label: "Fear",
        ring: "ring-blue-200",
      };
    return {
      color: "text-purple-500",
      bg: "bg-purple-100",
      label: "Extreme Fear",
      ring: "ring-purple-200",
    };
  };

  const currentValue = 87;
  const yesterdayValue = 74;
  const currentInfo = getFearGreedInfo(currentValue);
  const yesterdayInfo = getFearGreedInfo(yesterdayValue);

  // Calculate percentage change
  const changePercent = (
    ((currentValue - yesterdayValue) / yesterdayValue) *
    100
  ).toFixed(1);
  const isPositive = changePercent > 0;

  return (
    <div className=" w-auto h-full shadow-md rounded-md border border-gray-200 p-6">
      {/* Header with tabs */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-800">Fear & Greed Index</h1>

        {/* Time Period Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-0.5">
          {tabsTime.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabTime(tab.id)}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                activeTabTime === tab.id
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 h-auto">
        {/* Main Gauge Section */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-8 h-full">
            <div className="flex flex-col items-center">
              {/* Circular Gauge */}
              <div className="relative mb-8">
                <div
                  className={`w-40 h-40 ${currentInfo.bg} rounded-full flex justify-center items-center ring-8 ${currentInfo.ring} shadow-lg`}
                >
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${currentInfo.color}`}>
                      {currentValue}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">INDEX</div>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute text-center -bottom-6 left-1/2 transform -translate-x-1/2 px-2 py-2 ${currentInfo.bg} ${currentInfo.color} rounded-full text-sm font-bold shadow-md border-2 border-white`}
                >
                  {currentInfo.label}
                </div>
              </div>

              {/* Change Indicator */}
              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                    isPositive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <span className={`text-lg ${isPositive ? "↗" : "↘"}`}>
                    {isPositive ? "↗" : "↘"}
                  </span>
                  {Math.abs(changePercent)}%
                </span>
                <span className="text-gray-500 text-sm">vs yesterday</span>
              </div>

              {/* Description */}
              <div className="text-center max-w-md">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Market Sentiment Analysis
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The Fear & Greed Index measures market sentiment using various
                  indicators including volatility, momentum, social media
                  sentiment, and market breadth to provide a comprehensive view
                  of investor emotions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Statistics */}
        <div className="flex flex-col gap-3">
          {/* Yesterday's Value */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 ${yesterdayInfo.bgLight} rounded-lg flex items-center justify-center border`}
              >
                <div className={`text-xs font-bold ${yesterdayInfo.color}`}>
                  {yesterdayValue}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  Yesterday
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {yesterdayInfo.label}
                </div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border">
                <div className="text-xs font-bold text-blue-600">65</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  This Week
                </div>
                <div className="text-xs text-gray-500 truncate">Greed</div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border">
                <div className="text-xs font-bold text-blue-600">65</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  This Week
                </div>
                <div className="text-xs text-gray-500 truncate">Greed</div>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border">
                <div className="text-xs font-bold text-blue-600">65</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">
                  This Week
                </div>
                <div className="text-xs text-gray-500 truncate">Greed</div>
              </div>
            </div>
          </div>

          {/* Scale Reference */}
          <div className="bg-gradient-to-r from-purple-50 to-red-50 border border-gray-200 rounded-lg p-3 flex-1">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Scale</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-purple-600 font-medium">0-24</span>
                <span className="text-gray-600">Extreme Fear</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">25-44</span>
                <span className="text-gray-600">Fear</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600 font-medium">45-54</span>
                <span className="text-gray-600">Neutral</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-600 font-medium">55-74</span>
                <span className="text-gray-600">Greed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600 font-medium">75-100</span>
                <span className="text-gray-600">Extreme Greed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div>Updated: {new Date().toLocaleTimeString()}</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxFearGear;
