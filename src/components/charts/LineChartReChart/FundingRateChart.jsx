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

// Mock data for demonstration
const mockData = [
  { price: 45000, binanceOI: 2500000, bybitOI: 1800000 },
  { price: 46200, binanceOI: 2600000, bybitOI: 1900000 },
  { price: 47500, binanceOI: 2750000, bybitOI: 2000000 },
  { price: 46800, binanceOI: 2650000, bybitOI: 1950000 },
  { price: 48200, binanceOI: 2800000, bybitOI: 2100000 },
  { price: 49500, binanceOI: 2900000, bybitOI: 2200000 },
  { price: 50100, binanceOI: 3000000, bybitOI: 2300000 },
  { price: 49800, binanceOI: 2950000, bybitOI: 2250000 },
  { price: 51200, binanceOI: 3100000, bybitOI: 2400000 },
  { price: 52000, binanceOI: 3200000, bybitOI: 2500000 },
  { price: 51500, binanceOI: 3150000, bybitOI: 2450000 },
  { price: 53000, binanceOI: 3300000, bybitOI: 2600000 }
];

const data = mockData.map((item, index) => ({
  ...item,
  index: index + 1,
}));

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3 min-w-48">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Month {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">{entry.name}:</span>
            </div>
            <span className="text-sm font-medium text-gray-800">
              {entry.name === 'Price' 
                ? `$${entry.value.toLocaleString()}`
                : `$${(entry.value / 1000000).toFixed(1)}M`
              }
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const FundingRateChart = () => {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-blue-50  rounded-xl shadow-lg">
     

      {/* Chart Container */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart 
            data={data}
            // margin={{ top: 60, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="binanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="bybitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              stroke="#e5e7eb" 
              strokeDasharray="2 2" 
              strokeOpacity={0.5}
            />
            
            <XAxis
              dataKey="index"
              interval={0}
              ticks={[1, 3, 5, 7, 9, 11, 12]}
              tickFormatter={(val) => {
                const mapping = {
                  1: "Jan",
                  3: "Mar", 
                  5: "May",
                  7: "Jul",
                  9: "Sep",
                  11: "Nov",
                  12: "Dec",
                };
                return mapping[val] ?? "";
              }}
              tickLine={false}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              padding={{ left: 20, right: 20 }}
            />
            
            <YAxis
              yAxisId="left"
              orientation="left"
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={false}
            />
            
            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
              tickLine={false}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Open Interest Areas */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="binanceOI"
              stackId="1"
              fill="url(#binanceGradient)"
              stroke="#f59e0b"
              strokeWidth={1}
              name="Binance OI"
            />
            
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="bybitOI"
              stackId="1"
              fill="url(#bybitGradient)"
              stroke="#3b82f6"
              strokeWidth={1}
              name="Bybit OI"
            />
            
            {/* Price Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#ef4444"
              strokeWidth={3}
              // dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              // activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2, fill: '#fff' }}
              name="Price"
            />
            
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                paddingBottom: '20px',
              }}
              iconType="line"
              formatter={(value, entry) => (
                <span style={{ color: entry.color, fontSize: '13px', fontWeight: '500' }}>
                  {value}
                </span>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default FundingRateChart;