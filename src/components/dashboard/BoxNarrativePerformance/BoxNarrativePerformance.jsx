import { useState } from "react";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import LineChartReChart from "@/components/charts/LineChart/TinyLineChart";
import TabButtons from "@/components/TabButtons/TabButtons";
import { images } from "@/assets";

const BoxNarrativePerformance = () => {
  const [activeTab, setActiveTab] = useState("24h");

  const tabsData = [
    { id: "24h", label: "24h" },
    { id: "1w", label: "1w" },
    { id: "1m", label: "1m" },
    { id: "1y", label: "1y" },
  ];

  // Dữ liệu mẫu với các giá trị thay đổi để hiển thị xu hướng tăng/giảm
  const cardPriceData = {
    "24h": [
      {
        label: "Bitcoin",
        percentageChange: "3.96",
        percentageDom: "3.96",
        trend: "up",
        icon: images.btcIcon,
        color: "#F7931A",
      },
      {
        label: "Ethereum",
        percentageChange: "2.45",
        percentageDom: "2.45",
        trend: "up",
        icon: images.btcIcon,
        color: "#627EEA",
      },
      {
        label: "Solana",
        percentageChange: "-1.28",
        percentageDom: "-1.28",
        trend: "down",
        icon: images.btcIcon,
        color: "#00FFA3",
      },
      {
        label: "Dogecoin",
        percentageChange: "5.73",
        percentageDom: "5.73",
        trend: "up",
        icon: images.btcIcon,
        color: "#C2A633",
      },
      {
        label: "Cardano",
        percentageChange: "-0.89",
        percentageDom: "-0.89",
        trend: "down",
        icon: images.btcIcon,
        color: "#0033AD",
      },
      {
        label: "Cardano",
        percentageChange: "-0.89",
        percentageDom: "-0.89",
        trend: "down",
        icon: images.btcIcon,
        color: "#0033AD",
      },
      {
        label: "Cardano",
        percentageChange: "-0.89",
        percentageDom: "-0.89",
        trend: "down",
        icon: images.btcIcon,
        color: "#0033AD",
      },
      {
        label: "Cardano",
        percentageChange: "-0.89",
        percentageDom: "-0.89",
        trend: "down",
        icon: images.btcIcon,
        color: "#0033AD",
      },
    ],
    "1w": [
      {
        label: "Bitcoin",
        percentageChange: "12.31",
        percentageDom: "12.31",
        trend: "up",
        icon: "BTC",
        color: "#F7931A",
      },
      {
        label: "Ethereum",
        percentageChange: "8.76",
        percentageDom: "8.76",
        trend: "up",
        icon: "ETH",
        color: "#627EEA",
      },
      {
        label: "Solana",
        percentageChange: "15.42",
        percentageDom: "15.42",
        trend: "up",
        icon: "SOL",
        color: "#00FFA3",
      },
      {
        label: "Dogecoin",
        percentageChange: "-4.20",
        percentageDom: "-4.20",
        trend: "down",
        icon: "DOGE",
        color: "#C2A633",
      },
      {
        label: "Cardano",
        percentageChange: "3.67",
        percentageDom: "3.67",
        trend: "up",
        icon: "ADA",
        color: "#0033AD",
      },
    ],
    "1m": [
      {
        label: "Bitcoin",
        percentageChange: "21.45",
        percentageDom: "21.45",
        trend: "up",
        icon: "BTC",
        color: "#F7931A",
      },
      {
        label: "Ethereum",
        percentageChange: "18.92",
        percentageDom: "18.92",
        trend: "up",
        icon: "ETH",
        color: "#627EEA",
      },
      {
        label: "Solana",
        percentageChange: "34.67",
        percentageDom: "34.67",
        trend: "up",
        icon: "SOL",
        color: "#00FFA3",
      },
      {
        label: "Dogecoin",
        percentageChange: "-8.32",
        percentageDom: "-8.32",
        trend: "down",
        icon: "DOGE",
        color: "#C2A633",
      },
      {
        label: "Cardano",
        percentageChange: "12.56",
        percentageDom: "12.56",
        trend: "up",
        icon: "ADA",
        color: "#0033AD",
      },
    ],
    "1y": [
      {
        label: "Bitcoin",
        percentageChange: "124.78",
        percentageDom: "124.78",
        trend: "up",
        icon: "BTC",
        color: "#F7931A",
      },
      {
        label: "Ethereum",
        percentageChange: "87.32",
        percentageDom: "87.32",
        trend: "up",
        icon: "ETH",
        color: "#627EEA",
      },
      {
        label: "Solana",
        percentageChange: "356.21",
        percentageDom: "356.21",
        trend: "up",
        icon: "SOL",
        color: "#00FFA3",
      },
      {
        label: "Dogecoin",
        percentageChange: "-23.45",
        percentageDom: "-23.45",
        trend: "down",
        icon: "DOGE",
        color: "#C2A633",
      },
      {
        label: "Cardano",
        percentageChange: "45.67",
        percentageDom: "45.67",
        trend: "up",
        icon: "ADA",
        color: "#0033AD",
      },
    ],
  };

  const tableDataContent = {
    "24h": [
      {
        label: "Bitcoin",
        icon: images.btcIcon,
        price: "$100.86B",
        percentageChange: "3.96",
        trend: "up",
        netInflow: "+3.96%",
        color: "#F7931A",
      },
      {
        label: "Ethereum",
        icon: images.ethIcon,
        price: "$45.72B",
        percentageChange: "2.45",
        trend: "up",
        netInflow: "+2.45%",
        color: "#627EEA",
      },
      {
        label: "Solana",
        icon: images.solIcon,
        price: "$23.56B",
        percentageChange: "-1.28",
        trend: "down",
        netInflow: "-1.28%",
        color: "#00FFA3",
      },
      {
        label: "Dogecoin",
        icon: images.bnbIcon,
        price: "$10.23B",
        percentageChange: "5.73",
        trend: "up",
        netInflow: "+5.73%",
        color: "#C2A633",
      },
      {
        label: "Cardano",
        icon: images.bnbIcon,
        price: "$8.91B",
        percentageChange: "-0.89",
        trend: "down",
        netInflow: "-0.89%",
        color: "#0033AD",
      },
    ],
    "1w": [
      // Dữ liệu tương tự cho 1w
    ],
    "1m": [
      // Dữ liệu tương tự cho 1m
    ],
    "1y": [
      // Dữ liệu tương tự cho 1y
    ],
  };

  // Tính toán giá trị "All" dựa trên trung bình của tất cả các giá trị percentageChange
  const calculateOverallPercentage = () => {
    const currentData = cardPriceData[activeTab] || [];
    if (currentData.length === 0) return { value: "0.00", trend: "up" };

    const sum = currentData.reduce((acc, item) => {
      return acc + parseFloat(item.percentageChange);
    }, 0);

    const average = sum / currentData.length;
    return {
      value: average.toFixed(2),
      trend: average >= 0 ? "up" : "down",
    };
  };

  const overallData = calculateOverallPercentage();

  return (
    <div className="rounded-xl bg-gray-50 p-4 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-black font-medium text-lg">
          Narratives Performance
        </h2>
        <TabButtons
          tabs={tabsData}
          activeTab={activeTab}
          onTabClick={setActiveTab}
          tabType="type1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Cards Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {/* Overall Card */}
          <PriceCard
            label="All"
            percentageDom={`${overallData.value}%`}
            percentageChange={overallData.value}
            trend={overallData.trend}
            isMain={true}
          />

          {/* Cryptocurrency Cards */}
          {cardPriceData[activeTab]?.map((item, index) => (
            <PriceCard
              key={index}
              label={item.label}
              percentageDom={`${item.percentageDom}%`}
              percentageChange={item.percentageChange}
              trend={item.trend}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        {/* Table Section */}
        <div className="overflow-auto bg-white rounded-lg shadow border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-700 font-medium border-b border-gray-200">
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">{activeTab} Change</th>
                <th className="p-3 text-left">Net Inflow</th>
              </tr>
            </thead>
            <tbody>
              {tableDataContent[activeTab]?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-gray-600">{index + 1}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                        // style={{ backgroundColor: item.color }}
                      >
                        {/* {item.icon} */}
                        <img src={item.icon} alt=""  />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium">{item.price}</td>
                  <td className="p-3">
                    <PercentageDisplay
                      value={item.percentageChange}
                      trend={item.trend}
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-700">
                    {item.netInflow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Component hiển thị phần trăm với mũi tên tăng/giảm
export const PercentageDisplay = ({ value, trend }) => {
  const numValue = parseFloat(value);
  const color = numValue >= 0 ? "text-green-600" : "text-red-600";
  const ArrowIcon = numValue >= 0 ? ArrowUp : ArrowDown;

  return (
    <div className={`flex items-center gap-1 ${color}`}>
      <ArrowIcon size={16} />
      <span className="font-medium">{Math.abs(numValue)}%</span>
    </div>
  );
};

// Component Card hiển thị giá
const PriceCard = ({
  label,
  percentageDom,
  percentageChange,
  trend,
  isMain = false,
  icon,
  color,
}) => {
  const numValue = parseFloat(percentageChange);
  const textColor = numValue >= 0 ? "text-green-600" : "text-red-600";

  return (
    <div
      className={`
        relative overflow-hidden p-3 rounded-lg flex flex-col justify-between h-28
        ${
          isMain
            ? "border-2 border-black bg-white"
            : "bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {!isMain && icon && (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
              // style={{ backgroundColor: color }}
            >
              <img src={icon} alt="" />
            </div>
          )}
          <span className="font-medium text-gray-900">{label}</span>
        </div>
        <span className={`text-xs font-medium ${textColor}`}>
          {percentageDom}
        </span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="w-full h-12">
          <LineChartReChart />
        </div>
        <PercentageDisplay value={percentageChange} trend={trend} />
      </div>
    </div>
  );
};

export default BoxNarrativePerformance;
