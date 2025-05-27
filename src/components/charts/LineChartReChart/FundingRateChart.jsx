import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Dữ liệu gốc
const mockData = [
  { time: "1", price: 20000, binanceOI: 10000, bybitOI: 5000 },
  { time: "2", price: 40000, binanceOI: 30000, bybitOI: 10000 },
  { time: "4", price: 30000, binanceOI: 25000, bybitOI: 12000 },
  { time: "4", price: 45000, binanceOI: 27000, bybitOI: 15000 },
  { time: "5", price: 60000, binanceOI: 35000, bybitOI: 22000 },
  { time: "6", price: 50000, binanceOI: 30000, bybitOI: 18000 },
  { time: "7", price: 65000, binanceOI: 40000, bybitOI: 25000 },
  { time: "8", price: 70000, binanceOI: 42000, bybitOI: 28000 },
  { time: "9", price: 50000, binanceOI: 32000, bybitOI: 18000 },
  { time: "10", price: 55000, binanceOI: 31000, bybitOI: 17000 },
  { time: "12", price: 10000, binanceOI: 36000, bybitOI: 5000 },
  { time: "1", price: 20000, binanceOI: 10000, bybitOI: 5000 },
  { time: "2", price: 40000, binanceOI: 30000, bybitOI: 10000 },
  { time: "4", price: 30000, binanceOI: 25000, bybitOI: 12000 },
  { time: "4", price: 45000, binanceOI: 27000, bybitOI: 15000 },
  { time: "5", price: 60000, binanceOI: 35000, bybitOI: 22000 },
  { time: "6", price: 50000, binanceOI: 30000, bybitOI: 18000 },
  { time: "7", price: 65000, binanceOI: 40000, bybitOI: 25000 },
  { time: "8", price: 70000, binanceOI: 42000, bybitOI: 28000 },
  { time: "9", price: 50000, binanceOI: 32000, bybitOI: 18000 },
  { time: "10", price: 55000, binanceOI: 31000, bybitOI: 17000 },
  { time: "12", price: 50000, binanceOI: 15000, bybitOI: 4000 },
  { time: "1", price: 20000, binanceOI: 10000, bybitOI: 5000 },
  { time: "2", price: 40000, binanceOI: 30000, bybitOI: 10000 },
  { time: "4", price: 30000, binanceOI: 25000, bybitOI: 12000 },
  { time: "4", price: 45000, binanceOI: 27000, bybitOI: 15000 },
  { time: "5", price: 60000, binanceOI: 35000, bybitOI: 22000 },
  { time: "6", price: 50000, binanceOI: 30000, bybitOI: 18000 },
  { time: "7", price: 65000, binanceOI: 40000, bybitOI: 25000 },
  { time: "8", price: 70000, binanceOI: 42000, bybitOI: 28000 },
  { time: "9", price: 50000, binanceOI: 32000, bybitOI: 18000 },
  { time: "10", price: 55000, binanceOI: 31000, bybitOI: 17000 },
  { time: "12", price: 10000, binanceOI: 32000, bybitOI: 7000 },
  { time: "1", price: 20000, binanceOI: 10000, bybitOI: 5000 },
  { time: "2", price: 40000, binanceOI: 30000, bybitOI: 10000 },
  { time: "4", price: 30000, binanceOI: 25000, bybitOI: 12000 },
  { time: "4", price: 45000, binanceOI: 27000, bybitOI: 15000 },
  { time: "5", price: 60000, binanceOI: 35000, bybitOI: 22000 },
  { time: "6", price: 50000, binanceOI: 30000, bybitOI: 18000 },
  { time: "7", price: 65000, binanceOI: 40000, bybitOI: 25000 },
  { time: "8", price: 70000, binanceOI: 42000, bybitOI: 28000 },
  { time: "9", price: 50000, binanceOI: 32000, bybitOI: 18000 },
  { time: "10", price: 55000, binanceOI: 31000, bybitOI: 17000 },
  { time: "12", price: 20000, binanceOI: 10000, bybitOI: 3000 },
];

const data = mockData.map((item, index) => ({
  ...item,
  index: index + 1,
}));

const FundingRateChart = () => {
  return (
    <div className="chart-container">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={mockData}>
          <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />

          <XAxis
            dataKey="index"
            interval={0}
            ticks={[0, 10, 20, 30, 40, 50, 60]}
            tickFormatter={(val) => {
              const mapping = {
                0: "1",
                10: "2",
                20: "4",
                30: "6",
                40: "8",
                50: "10",
                60: "12",
              };
              return mapping[val] ?? "";
            }}
            tickLine={false}
            axisLine={true}
            padding={{ left: 20, right: 20 }}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
          />

          <Tooltip />

          {/* Open Interest */}
          <Area
            yAxisId="right"
            type="linear"
            dataKey="binanceOI"
            stackId="1"
            fill="#aaaaaa"
            name="Binance OI"
            stroke="none"
          />
          <Area
            yAxisId="right"
            type="linear"
            dataKey="bybitOI"
            stackId="1"
            fill="#cccccc"
            name="Bybit OI"
            stroke="none"
          />

          {/* Price */}
          <Line
            yAxisId="left"
            type="linear"
            dataKey="price"
            stroke="red"
            strokeWidth={1}
            dot={false}
            name="Price"
          />
          <Legend
            verticalAlign="top"
            align="left"
            wrapperStyle={{
              position: "relative",
              top: -410, // Dịch xuống dưới
              right: -50,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FundingRateChart;
