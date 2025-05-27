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
  { time: "1", price: 20000, accumulation: 10000 },
  { time: "2", price: 40000, accumulation: 30000 },
  { time: "4", price: 30000, accumulation: 25000 },
  { time: "4", price: 45000, accumulation: 27000 },
  { time: "5", price: 60000, accumulation: 35000 },
  { time: "6", price: 50000, accumulation: 30000 },
  { time: "7", price: 65000, accumulation: 40000 },
  { time: "8", price: 70000, accumulation: 42000 },
  { time: "9", price: 50000, accumulation: 32000 },
  { time: "10", price: 55000, accumulation: 31000 },
  { time: "12", price: 10000, accumulation: 36000 },
  { time: "1", price: 20000, accumulation: 10000 },
  { time: "2", price: 40000, accumulation: 30000 },
  { time: "4", price: 30000, accumulation: 25000 },
  { time: "4", price: 45000, accumulation: 27000 },
  { time: "5", price: 60000, accumulation: 35000 },
  { time: "6", price: 50000, accumulation: 30000 },
  { time: "7", price: 65000, accumulation: 40000 },
  { time: "8", price: 70000, accumulation: 42000 },
  { time: "9", price: 50000, accumulation: 32000 },
  { time: "10", price: 55000, accumulation: 31000 },
  { time: "12", price: 50000, accumulation: 15000 },
  { time: "1", price: 20000, accumulation: 10000 },
  { time: "2", price: 40000, accumulation: 30000 },
  { time: "4", price: 30000, accumulation: 25000 },
  { time: "4", price: 45000, accumulation: 27000 },
  { time: "5", price: 60000, accumulation: 35000 },
  { time: "6", price: 50000, accumulation: 30000 },
  { time: "7", price: 65000, accumulation: 40000 },
  { time: "8", price: 70000, accumulation: 42000 },
  { time: "9", price: 50000, accumulation: 32000 },
  { time: "10", price: 55000, accumulation: 31000 },
  { time: "12", price: 10000, accumulation: 32000 },
  { time: "1", price: 20000, accumulation: 10000 },
  { time: "2", price: 40000, accumulation: 30000 },
  { time: "4", price: 30000, accumulation: 25000 },
  { time: "4", price: 45000, accumulation: 27000 },
  { time: "5", price: 60000, accumulation: 35000 },
  { time: "6", price: 50000, accumulation: 30000 },
  { time: "7", price: 65000, accumulation: 40000 },
  { time: "8", price: 70000, accumulation: 42000 },
  { time: "9", price: 50000, accumulation: 32000 },
  { time: "10", price: 55000, accumulation: 31000 },
  { time: "12", price: 20000, accumulation: 10000 },
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
    <defs>
      {/* Gradient mờ từ trên xuống */}
      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#76E1DB" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#76E1DB" stopOpacity="0" />
      </linearGradient>

      {/* Drop shadow */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#76E1DB" floodOpacity="0.5" />
      </filter>
    </defs>


    <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />

    <XAxis
      dataKey="time"
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
      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}M`}
    />

    <Tooltip />

    <Area
      yAxisId="right"
      type="linear"
      dataKey="accumulation"
       stroke="#00BFA6"
      name="Whale accumulation"
      filter="url(#shadow)"
      fill="url(#gradientFill)"
    />
   


    <Line
      yAxisId="left"
      type="linear"
      dataKey="price"
      stroke="green"
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
        right: -50
      }}
    />
  </ComposedChart>
</ResponsiveContainer>

    </div>
  );
};

export default FundingRateChart;
