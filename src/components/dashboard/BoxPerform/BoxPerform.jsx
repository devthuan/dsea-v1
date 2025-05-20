
import { images } from "@/assets";
import { useState } from "react";
import { PercentageDisplay } from "../BoxNarrativePerformance/BoxNarrativePerformance";
import TabButtons from "@/components/TabButtons/TabButtons";


 const tableDataContent = {
   "under perform": [
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
   "outder perform": [
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


export const BoxPerform = () => {
    const [activeTab, setActiveTab] = useState("under perform");
    
    const tabsData = [
      { id: "under perform", label: "under perform" },
      { id: "outder perform", label: "outder perform" },
    ];

    const handleChooseTab = (event) => {
      setActiveTab(event);
    };

    return (
      <div className="overflow-auto bg-white rounded-lg shadow border border-gray-100">
        <div className="w-full p-4 flex justify-end">
          <TabButtons
            tabs={tabsData}
            activeTab={activeTab}
            onTabClick={handleChooseTab}
            tabType="type2"
          />
        </div>

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
                      <img src={item.icon} alt="" />
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
    );
}