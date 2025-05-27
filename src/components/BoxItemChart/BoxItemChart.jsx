import { images } from "@/assets/index";
import LineChartReChart2 from "@/components/charts/LineChartReChart2/LineChartReChart2";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronUp } from "lucide-react";

const signalCards = [
  {
    title: "PEPE",
    time: "6h ago",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    title: "NFT Volume",
    time: "6h ago",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    title: "Top Whales",
    time: "6h ago",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
  {
    title: "NFT Volume",
    time: "6h ago",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  },
];

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
  {
    chartData: dataChart,
    percentage: "+25%",
  },
  {
    chartData: dataChart,
    percentage: "+25%",
  },
];

const BoxItemChart = ({
  icon = images.bnbIcon,
  title = "Ethereum",
  subtitle = "ETH",
  value = "$28,291",
  percentage = "-0.25%",
  chartData = [],
  dataKey = "uv",
}) => {
  // const isPositive = percentage.startsWith("+");
  // const textColor = isPositive ? "text-green-500" : "text-red-500";

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className={""}>
        {dataBoxItemChart.map((card, index) => {
          const isPositive = card.percentage.startsWith("+");
          const textColor = isPositive ? "text-green-500" : "text-red-500";

          return (
            <CarouselItem
              key={index}
              className="mr-3 basis-1/4 bg-white p-4 rounded-lg border border-gray-200"
            >
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center">
                      <img className="w-8 h-auto" src={icon} alt={title} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">{title}</p>
                      <p className="text-gray-500 text-xs font-medium">
                        {subtitle}
                      </p>
                      Overview
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-full flex mt-2">
                    <div className="w-auto h-auto flex flex-col gap-y-1">
                      <p
                        className={`text-xl font-bold  tracking-wide ${textColor}`}
                      >
                        {value}
                      </p>
                      <div
                        className={`flex items-center gap-1 ${textColor} font-medium text-sm`}
                      >
                        <span className="flex justify-center items-center gap-1">
                          {isPositive ? (
                            <ChevronUp className="text-green-500" />
                          ) : (
                            <ChevronUp className="text-red-500 rotate-180" />
                          )}
                          {card.percentage}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-auto mt-2">
                    <LineChartReChart2
                      data={chartData}
                      dataKey={dataKey}
                      height={60}
                      color={isPositive ? "#10B981" : "#EF4444"}
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className={"cursor-pointer"} />
      <CarouselNext className={"cursor-pointer"} />
    </Carousel>
  );
};

export default BoxItemChart;
