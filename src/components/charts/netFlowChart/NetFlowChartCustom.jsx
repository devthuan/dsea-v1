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


const NetFlowChartCustom = ({ data = [] }) => {
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
      style={{ width: "100%", height: "100%" }}
      onWheel={handleWheel}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <ResponsiveContainer width="100%" height={"100%"}>
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
