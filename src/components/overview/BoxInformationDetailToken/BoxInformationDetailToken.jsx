import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";

const BoxInformationDetailToken = () => {
  return (
    <div className="w-full h-full bg-white p-6 rounded-md shadow-md border border-gray-200">
      <div className="grid grid-cols-4 gap-6 h-full">
        {/* Token Info Section */}
        <div className="border-r border-gray-200 pr-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex justify-center items-center">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 font-inter">
                Solana
              </h1>
              <p className="text-lg font-light text-gray-600 font-inter">
                (SOL)
              </p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 font-inter">
              $215.88
            </div>
            <div className="flex items-center justify-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500 font-semibold">+5.24%</span>
            </div>
          </div>
        </div>

        {/* Market Stats Section */}
        <div className="border-r border-gray-200 pr-6">
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">
                  24h Volume
                </span>
              </div>
              <div className="text-sm font-bold text-gray-900">$2.8B</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-semibold text-gray-700">
                  Market Cap
                </span>
              </div>
              <div className="text-sm font-bold text-gray-900">$103.2B</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700">
                24h High
              </span>
              <div className="text-sm font-bold text-gray-900">$218.45</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700">
                24h Low
              </span>
              <div className="text-sm font-bold text-gray-900">$208.12</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700">
                Circulating
              </span>
              <div className="text-sm font-bold text-gray-900">478M SOL</div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-700">
                Total Supply
              </span>
              <div className="text-sm font-bold text-gray-900">588M SOL</div>
            </div>
          </div>
        </div>

        {/* Whale Holdings Section */}
        <div className="border-r border-gray-200 pr-6">
          <div className="space-y-4 h-full flex flex-col justify-center">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Users className="w-3 h-3 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-700 leading-tight">
                    Whale Holdings
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-tight">
                  Top 100 addresses hold
                </p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-sm font-bold text-green-500">43.02%</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-1">
                Distribution Health
              </div>
              <div className="text-lg font-bold text-green-600">Good</div>
              <div className="text-xs text-gray-500">Well distributed</div>
            </div>
          </div>
        </div>

        {/* Price Range & Metrics Section */}
        <div className="space-y-3">
          {/* 52 Week Range */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">
                52W Low
              </span>
              <span className="text-xs font-semibold text-gray-700">
                52W High
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">$8.56</span>
              <span className="font-bold text-gray-900">$294.33</span>
            </div>
            <div className="relative">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full relative"
                  style={{ width: "75%" }}
                >
                  <div className="absolute right-0 top-0 w-3 h-3 bg-green-600 rounded-full transform translate-x-1/2 -translate-y-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* All Time High */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">ATH</span>
              <span className="text-xs font-semibold text-gray-700">
                From ATH
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-900">$259.96</span>
              <div className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-red-500" />
                <span className="font-bold text-red-500">-17.0%</span>
              </div>
            </div>
          </div>

          {/* Fear & Greed Index */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3">
            <div className="text-xs font-semibold text-gray-700 mb-1">
              Fear & Greed Index
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-orange-600">72</span>
              <span className="text-xs font-semibold text-orange-600">
                Greed
              </span>
            </div>
          </div>

          {/* RSI Indicator */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">
                RSI (14)
              </span>
              <span className="text-xs font-semibold text-purple-600">
                68.5
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full">
              <div
                className="h-1.5 bg-purple-500 rounded-full"
                style={{ width: "68.5%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">Approaching overbought</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxInformationDetailToken;
