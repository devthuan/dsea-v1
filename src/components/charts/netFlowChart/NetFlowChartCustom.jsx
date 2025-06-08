import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Brush,
} from "recharts";

const initialData = [
  { time: "2024-01-01", inflow: 20000, outflow: 10000, balance: 11000 },
  { time: "2024-01-02", inflow: 46500, outflow: 96100, balance: 26900 },
  { time: "2024-01-03", inflow: 56500, outflow: 35100, balance: 57400 },
  { time: "2024-01-04", inflow: 38000, outflow: 20600, balance: 74300 },
  { time: "2024-01-05", inflow: 48200, outflow: 13600, balance: 64200 },
  { time: "2024-01-01", inflow: 32000, outflow: 28000, balance: 42000 },
  { time: "2024-01-02", inflow: 34465, outflow: 25961, balance: 40269 },
  { time: "2024-01-03", inflow: 36565, outflow: 54351, balance: 36574 },
  { time: "2024-01-04", inflow: 34380, outflow: 54206, balance: 40743 },
  { time: "2024-01-05", inflow: 35482, outflow: 62136, balance: 43642 },
  { time: "2024-01-06", inflow: 33193, outflow: 74340, balance: 42846 },
  { time: "2024-01-07", inflow: 34066, outflow: 86015, balance: 43986 },
  { time: "2024-01-08", inflow: 36824, outflow: 18997, balance: 40471 },
  { time: "2024-01-09", inflow: 39809, outflow: 29057, balance: 37256 },
  { time: "2024-01-10", inflow: 36446, outflow: 23774, balance: 34677 },
  { time: "2024-01-11", inflow: 38763, outflow: 29194, balance: 31257 },
  { time: "2024-01-12", inflow: 36355, outflow: 26742, balance: 31109 },
  { time: "2024-01-13", inflow: 37999, outflow: 26651, balance: 27747 },
  { time: "2024-01-14", inflow: 37421, outflow: 27429, balance: 31185 },
  { time: "2024-01-15", inflow: 36662, outflow: 28092, balance: 30779 },
  { time: "2024-01-16", inflow: 39473, outflow: 0, balance: 32765 },
  { time: "2024-01-17", inflow: 39348, outflow: 0, balance: 36271 },
  { time: "2024-01-18", inflow: 39898, outflow: 0, balance: 36682 },
  { time: "2024-01-19", inflow: 36653, outflow: 26077, balance: 38984 },
  { time: "2024-01-20", inflow: 36372, outflow: 28985, balance: 37099 },
  { time: "2024-01-21", inflow: 36437, outflow: 28716, balance: 35736 },
  { time: "2024-01-22", inflow: 34691, outflow: 30777, balance: 32976 },
  { time: "2024-01-23", inflow: 31734, outflow: 30855, balance: 37262 },
  { time: "2024-01-24", inflow: 33061, outflow: 32574, balance: 39208 },
  { time: "2024-01-25", inflow: 31408, outflow: 33189, balance: 35043 },
  { time: "2024-01-26", inflow: 31998, outflow: 36252, balance: 32575 },
  { time: "2024-01-27", inflow: 28948, outflow: 38110, balance: 35492 },
  { time: "2024-01-28", inflow: 29048, outflow: 37857, balance: 33794 },
  { time: "2024-01-29", inflow: 27357, outflow: 36962, balance: 31268 },
  { time: "2024-01-30", inflow: 28056, outflow: 38921, balance: 29173 },
  { time: "2024-01-31", inflow: 29637, outflow: 39983, balance: 27185 },
  // { time: "2024-02-01", inflow: 31975, outflow: 41755, balance: 25835 },
  // { time: "2024-02-02", inflow: 33204, outflow: 42386, balance: 29742 },
  // { time: "2024-02-03", inflow: 33743, outflow: 41921, balance: 32985 },
  // { time: "2024-02-04", inflow: 35208, outflow: 40197, balance: 35628 },
  // { time: "2024-02-05", inflow: 33829, outflow: 39745, balance: 37415 },
  // { time: "2024-02-06", inflow: 31596, outflow: 38562, balance: 40261 },
  // { time: "2024-02-07", inflow: 34402, outflow: 40256, balance: 41983 },
  // { time: "2024-02-08", inflow: 36256, outflow: 41537, balance: 45762 },
  // { time: "2024-02-09", inflow: 38013, outflow: 42288, balance: 43927 },
  // { time: "2024-02-10", inflow: 40126, outflow: 41092, balance: 46582 },
  // { time: "2024-02-11", inflow: 41735, outflow: 43185, balance: 48762 },
  // { time: "2024-02-12", inflow: 43972, outflow: 45892, balance: 50937 },
  // { time: "2024-02-13", inflow: 45628, outflow: 47182, balance: 52415 },
  // { time: "2024-02-14", inflow: 46892, outflow: 48937, balance: 54012 },
  // { time: "2024-02-15", inflow: 48273, outflow: 50729, balance: 55837 },
  // { time: "2024-02-16", inflow: 50162, outflow: 52138, balance: 57468 },
  // { time: "2024-02-17", inflow: 51532, outflow: 53392, balance: 59872 },
  // { time: "2024-03-01", inflow: 32000, outflow: 28000, balance: 42000 },
  // { time: "2024-03-02", inflow: 34465, outflow: 25961, balance: 40269 },
  // { time: "2024-03-03", inflow: 36565, outflow: 54351, balance: 36574 },
  // { time: "2024-03-04", inflow: 34380, outflow: 54206, balance: 40743 },
  // { time: "2024-03-05", inflow: 35482, outflow: 62136, balance: 43642 },
  // { time: "2024-03-06", inflow: 33193, outflow: 74340, balance: 42846 },
  // { time: "2024-03-07", inflow: 34066, outflow: 86015, balance: 43986 },
  // { time: "2024-03-08", inflow: 36824, outflow: 18997, balance: 40471 },
  // { time: "2024-03-09", inflow: 39809, outflow: 29057, balance: 37256 },
  // { time: "2024-03-10", inflow: 36446, outflow: 23774, balance: 34677 },
  // { time: "2024-03-11", inflow: 38763, outflow: 29194, balance: 31257 },
  // { time: "2024-03-12", inflow: 36355, outflow: 26742, balance: 31109 },
  // { time: "2024-03-13", inflow: 37999, outflow: 26651, balance: 27747 },
  // { time: "2024-03-14", inflow: 37421, outflow: 27429, balance: 31185 },
  // { time: "2024-03-15", inflow: 36662, outflow: 28092, balance: 30779 },
  // { time: "2024-03-16", inflow: 39473, outflow: 0, balance: 32765 },
  // { time: "2024-03-17", inflow: 39348, outflow: 0, balance: 36271 },
  // { time: "2024-03-18", inflow: 39898, outflow: 0, balance: 36682 },
  // { time: "2024-03-19", inflow: 36653, outflow: 26077, balance: 38984 },
  // { time: "2024-03-20", inflow: 36372, outflow: 28985, balance: 37099 },
  // { time: "2024-03-21", inflow: 36437, outflow: 28716, balance: 35736 },
  // { time: "2024-03-22", inflow: 34691, outflow: 30777, balance: 32976 },
  // { time: "2024-03-23", inflow: 31734, outflow: 30855, balance: 37262 },
  // { time: "2024-03-24", inflow: 33061, outflow: 32574, balance: 39208 },
  // { time: "2024-03-25", inflow: 31408, outflow: 33189, balance: 35043 },
  // { time: "2024-03-26", inflow: 31998, outflow: 36252, balance: 32575 },
  // { time: "2024-03-27", inflow: 28948, outflow: 38110, balance: 35492 },
  // { time: "2024-03-28", inflow: 29048, outflow: 37857, balance: 33794 },
  // { time: "2024-03-29", inflow: 27357, outflow: 36962, balance: 31268 },
  // { time: "2024-03-30", inflow: 28056, outflow: 38921, balance: 29173 },
  // { time: "2024-03-31", inflow: 29637, outflow: 39983, balance: 27185 },
];

const NetFlowChartCustom = ({ data = initialData || [], height = "100%" }) => {
  // Tính toán Net Flow
  const processedData = data?.map((item) => ({
    ...item,
    netFlow: item.inflow - item.outflow,
    inFlow: item.inflow,
    outFlow: -item.outflow,
  }));

  const [zoomRange, setZoomRange] = useState([0, data.length - 1]);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const formatNumber = (num) => {
    if (num === 0) return "0"; // Trường hợp đặc biệt cho số 0
    const absNum = Math.abs(num);
    let formatted = num.toString();

    if (absNum >= 1e9) formatted = "$" + (absNum / 1e9).toFixed(1) + "B";
    else if (absNum >= 1e6) formatted = "$" + (absNum / 1e6).toFixed(1) + "M";
    else if (absNum >= 1e3) formatted = "$" + (absNum / 1e3).toFixed(1) + "K";
    else formatted = absNum.toString(); // Giữ nguyên số nhỏ hơn 1000

    return num < 0 ? `-${formatted}` : formatted; // Giữ dấu âm chính xác
  };

  useEffect(() => {
    const disableScroll = (e) => {
      if (isMouseOver) e.preventDefault();
    };

    document.addEventListener("wheel", disableScroll, { passive: false });
    return () => document.removeEventListener("wheel", disableScroll);
  }, [isMouseOver]);

  // Xử lý cuộn chuột để zoom
  const handleWheel = (event) => {
    if (!isMouseOver) return; // Chỉ zoom khi chuột ở trong biểu đồ
    // event.preventDefault();
    const step = Math.ceil(data.length * 0.01);
    if (event.deltaY < 0) {
      setZoomRange(([start, end]) => [
        Math.min(start + step, data.length - 2),
        Math.max(end - step, 1),
      ]);
    } else {
      setZoomRange(([start, end]) => [
        Math.max(start - step, 0),
        Math.min(end + step, data.length - 1),
      ]);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div className="bg-white/60 rounded-md shadow-lg p-3 border border-gray-200">
          <div className="text-gray-700 text-sm font-medium mb-2 pb-2 border-b border-gray-200">
            {data.time}
          </div>

          <div className=" ">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-700 ">
                  inflow
                  <span className="pl-[14px]">:</span>
                </span>
              </div>
              <span className="text-gray text-sm">${data.inFlow}</span>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-700">outflow : </span>
              </div>
              <span className="text-gray text-sm">${data.outFlow}</span>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-700">netflow :</span>
              </div>
              <span className="text-gray text-sm">${data.netFlow}</span>
            </div>

            <div className="flex items-center justify-between space-x-4 pt-2 mt-1 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-700 ">balance :</span>
              </div>
              <span className="text-gray text-sm">${data.balance}</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const CustomLegend = () => {
    return (
      <div className="flex justify-center items-center gap-4 pb-2 pt-1">
        <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-emerald-700 font-medium text-xs">Inflow</span>
        </div>

        <div className="flex items-center gap-2 px-2 py-1 bg-red-50 rounded-md border border-red-100">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-red-700 font-medium text-xs">Outflow</span>
        </div>

        <div className="flex items-center gap-2 px-2 py-1 bg-amber-50 rounded-md border border-amber-100">
          <div className="w-3 h-1.5 rounded-full bg-amber-500"></div>
          <span className="text-amber-700 font-medium text-xs">Balance</span>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{ width: "100%", height: height }}
      onWheel={handleWheel}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <ResponsiveContainer width="100%" height={height}>
        <CustomLegend />
        <ComposedChart
          data={processedData}
          onWheel={handleWheel}
          barCategoryGap="0%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fontWeight: 500, fill: "#32383e" }}
            tickFormatter={(value) => {
              const date = new Date(value);
              const day = date.getDate().toString().padStart(2, "0");
              const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JS bắt đầu từ 0
              return `${day}-${month}`;
            }}
          />

          {/* Trục Y bên trái (Inflow, Outflow) */}
          <YAxis
            yAxisId="left"
            label={{
              angle: -90,
              position: "insideLeft",
              // value: "inFlow",
            }}
            tick={{ fontSize: 12, fontWeight: 500, fill: "#333" }}
            tickFormatter={formatNumber}
            domain={["auto", "auto"]}
          />

          {/* Trục Y bên phải (BTC Price) */}
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{
              angle: -90,
              position: "insideRight",
              // value: "BTC Price ($)",
            }}
            tick={{ fontSize: 12, fontWeight: 500, fill: "#333" }}
            domain={[0, "auto"]} // giá tối thiểu là 0
            tickFormatter={formatNumber}
          />

          <Tooltip content={<CustomTooltip />} />

          {/* Cột hiển thị Net Flow */}
          <Bar yAxisId="left" dataKey="netFlow" name="Net Flow" barSize={10}>
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.netFlow >= 0 ? "#15803d" : "#ef4444"} // Xanh nếu dương, đỏ nếu âm
              />
            ))}
          </Bar>

          {/* Đường cam cho BTC Price (Sử dụng yAxisId="right") */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="price"
            stroke="#EBBB4F"
            strokeWidth={2}
            dot={false}
            name="Balance"
          />
          {/* 
          <Brush
            height={30}
            startIndex={zoomRange[0]}
            endIndex={zoomRange[1]}
            onChange={({ startIndex, endIndex }) =>
              setZoomRange([startIndex, endIndex])
            }
          /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetFlowChartCustom;
