// import BoxFearGear from "@/components/asset/BoxFearGear/BoxFearGear";
// import BoxTableTopPerformance from "@/components/asset/BoxTableTopPerformance/BoxTableTopPerformance";
// import BoxBitcoinDominance from "@/components/asset/BoxBitcoinDominance/BoxBitcoinDominance";
import BoxBitcoinDominance from "@/components/asset/BoxBitcoinDominance/BoxBitcoinDominance";
import BoxFearGear from "@/components/asset/BoxFearGear/BoxFearGear";
import BoxTableTopPerformance from "@/components/asset/BoxTableTopPerformance/BoxTableTopPerformance";
import BoxItemChart from "@/components/BoxItemChart/BoxItemChart";
import { NavLink } from "react-router";
const Asset = () => {
  const dataChart = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  const dataBoxItemChart = [
    {
      chartData: dataChart,
      percentage: "+25%",
    },
    {
      chartData: dataChart,
      percentage: "-25%",
    },
    {
      chartData: dataChart,
      percentage: "+25%",
    },
  ];

  return (
    <div className={"w-auto h-full flex flex-col gap-y-5 px-6 "}>
      <div className="justify-start text-black text-2xl font-bold">
        Crypto Market Insights and Analytics
      </div>
      <div className="justify-center text-[#8a8a8a] text-sm font-normal  mt-[-15px]">
        TOP Cryptocurrencies Price List by Market Capitalization.
      </div>

      <div className="px-[40px] flex gap-2 ">
        <BoxItemChart />
      </div>

      <div className="h-auto grid auto-rows-min gap-4 md:grid-cols-2">
        <div className=" rounded-xl bg-muted/50">
          <BoxBitcoinDominance />
        </div>
        <div className=" rounded-xl bg-muted/50">
          <BoxFearGear />
        </div>
      </div>

    
    </div>
  );
};

export default Asset;
