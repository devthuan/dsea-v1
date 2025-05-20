import { images } from "@/assets/index";
import LineChartReChart2 from "@/components/charts/LineChartReChart2/LineChartReChart2";

const BoxItemChart = ({
  icon = images.bnbIcon,
  title = "Ethereum",
  subtitle = "ETH",
  value = "$28,291",
  percentage = "-0.25%",
  chartData = [],
  dataKey = "uv",
  width = "w-[436px]",
  height = "h-[178px]",
  className = "",
}) => {
  const isPositive = percentage.startsWith("+");

  return (
    <div
      className={`${width} ${height} p-6 rounded-2xl flex flex-col gap-2 bg-white/80 overflow-hidden ${className}`}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img className="w-[44px] h-auto" src={icon} alt="icon" />
            <div>
              <p className=" text-xl font-semibold font-['Poppins']">{title}</p>
              <p className="opacity-60 text-p5 text-xs font-normal font-['Poppins']">
                {subtitle}
              </p>
            </div>
          </div>
          <img
            src={isPositive ? images.triangleUpIcon : images.triangleDownIcon}
            alt="indicator"
          />
        </div>
        <div className="h-full flex mt-3">
          <div className="w-auto h-auto flex flex-col gap-y-1">
            <p
              className={`w-[142px]  text-2xl font-semibold font-['Poppins'] tracking-wide  `}
              style={{ color: isPositive ? "green" : "#fc5252" }}
            >
              {value}
            </p>
            <p
              className={`text-sm font-semibold font-['Poppins'] leading-snug tracking-tight `}
              style={{ color: isPositive ? "green" : "#fc5252" }}
            >
              {percentage}
            </p>
          </div>
          <div className="w-full h-full">
            <LineChartReChart2
              data={chartData}
              dataKey={dataKey}
              height={90}
              color={isPositive ? "green" : "#fc5252"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxItemChart;
