import React, { useState } from "react";

const allData = [
  {
    id: 1,
    holder: "Binance: BTC (0x9877)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$342,85K",
    pct: "24,97%",
    change: 24.97,
    priceChange: "up", // "up", "down", "neutral"
    usd: "$342,85K",
    volume: "$342,85K",
    supply: "$342,85K",
    supplyPercentage: 85,
    color: "#F7931A",
  },
  {
    id: 2,
    holder: "Coinbase: ETH (0x4f2a)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$287,32K",
    pct: "19,83%",
    change: 19.83,
    priceChange: "up",
    usd: "$287,32K",
    volume: "$287,32K",
    supply: "$287,32K",
    supplyPercentage: 78,
    color: "#627EEA",
  },
  {
    id: 3,
    holder: "Kraken: BTC (0x8c55)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$195,67K",
    pct: "-13,52%",
    change: -13.52,
    priceChange: "down",
    usd: "$195,67K",
    volume: "$195,67K",
    supply: "$195,67K",
    supplyPercentage: 92,
    color: "#F7931A",
  },
  {
    id: 4,
    holder: "Gemini: ETH (0x7a91)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$156,89K",
    pct: "10,84%",
    change: 10.84,
    priceChange: "up",
    usd: "$156,89K",
    volume: "$156,89K",
    supply: "$156,89K",
    supplyPercentage: 65,
    color: "#627EEA",
  },
  {
    id: 5,
    holder: "Huobi: BTC (0x3e44)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$134,22K",
    pct: "-9,27%",
    change: -9.27,
    priceChange: "down",
    usd: "$134,22K",
    volume: "$134,22K",
    supply: "$134,22K",
    supplyPercentage: 88,
    color: "#F7931A",
  },
  {
    id: 6,
    holder: "OKEx: ETH (0x9c77)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$98,45K",
    pct: "6,81%",
    change: 6.81,
    priceChange: "up",
    usd: "$98,45K",
    volume: "$98,45K",
    supply: "$98,45K",
    supplyPercentage: 72,
    color: "#627EEA",
  },
  {
    id: 7,
    holder: "Bitfinex: BTC (0x5d88)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$87,31K",
    pct: "6,04%",
    change: 6.04,
    priceChange: "neutral",
    usd: "$87,31K",
    volume: "$87,31K",
    supply: "$87,31K",
    supplyPercentage: 95,
    color: "#F7931A",
  },
  {
    id: 8,
    holder: "FTX: ETH (0x2a66)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$76,92K",
    pct: "-5,32%",
    change: -5.32,
    priceChange: "down",
    usd: "$76,92K",
    volume: "$76,92K",
    supply: "$76,92K",
    supplyPercentage: 58,
    color: "#627EEA",
  },
  {
    id: 9,
    holder: "Bitstamp: BTC (0x8f33)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$54,18K",
    pct: "3,74%",
    change: 3.74,
    priceChange: "up",
    usd: "$54,18K",
    volume: "$54,18K",
    supply: "$54,18K",
    supplyPercentage: 90,
    color: "#F7931A",
  },
  {
    id: 10,
    holder: "KuCoin: ETH (0x4b99)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$42,67K",
    pct: "-2,95%",
    change: -2.95,
    priceChange: "down",
    usd: "$42,67K",
    volume: "$42,67K",
    supply: "$42,67K",
    supplyPercentage: 43,
    color: "#627EEA",
  },
  {
    id: 11,
    holder: "Crypto.com: BTC (0x6e55)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$38,91K",
    pct: "2,69%",
    change: 2.69,
    priceChange: "neutral",
    usd: "$38,91K",
    volume: "$38,91K",
    supply: "$38,91K",
    supplyPercentage: 87,
    color: "#F7931A",
  },
  {
    id: 12,
    holder: "Bybit: ETH (0x1c22)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$29,84K",
    pct: "2,06%",
    change: 2.06,
    priceChange: "up",
    usd: "$29,84K",
    volume: "$29,84K",
    supply: "$29,84K",
    supplyPercentage: 67,
    color: "#627EEA",
  },
  {
    id: 13,
    holder: "Gate.io: BTC (0x9e88)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$25,73K",
    pct: "-1,78%",
    change: -1.78,
    priceChange: "down",
    usd: "$25,73K",
    volume: "$25,73K",
    supply: "$25,73K",
    supplyPercentage: 93,
    color: "#F7931A",
  },
  {
    id: 14,
    holder: "Bittrex: ETH (0x7f44)",
    symbol: "ETH",
    name: "Ethereum",
    value: "$19,56K",
    pct: "1,35%",
    change: 1.35,
    priceChange: "neutral",
    usd: "$19,56K",
    volume: "$19,56K",
    supply: "$19,56K",
    supplyPercentage: 51,
    color: "#627EEA",
  },
  {
    id: 15,
    holder: "Poloniex: BTC (0x3d77)",
    symbol: "BTC",
    name: "Bitcoin",
    value: "$14,82K",
    pct: "-1,02%",
    change: -1.02,
    priceChange: "down",
    usd: "$14,82K",
    volume: "$14,82K",
    supply: "$14,82K",
    supplyPercentage: 96,
    color: "#F7931A",
  },
];

const columnsExample = [
  { name: "#" },
  { name: "Token" },
  { name: "Price" },
  { name: "Change 24h" },
  { name: "Market cap" },
  { name: "Volume 24h" },
  { name: "Circ Supply" },
];

const ITEMS_PER_PAGE = 10;

// Supply Progress Bar Component
const SupplyProgressBar = ({ supply, percentage, tokenColor }) => {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-800 font-semibold text-sm">{supply}</span>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: tokenColor,
            opacity: 0.8,
          }}
        />
      </div>
      <span className="text-xs text-gray-500">{percentage}%</span>
    </div>
  );
};

// Price Color Component
const PriceDisplay = ({ value, priceChange }) => {
  const getPriceColor = (priceChange) => {
    switch (priceChange) {
      case "up":
        return "text-green-600 ";
      case "down":
        return "text-red-600 ";
      case "neutral":
        return "text-gray-800 ";
      default:
        return "text-gray-800 ";
    }
  };

  return (
    <span
      className={`font-semibold text-sm px-2 py-1 rounded-md  transition-all duration-300 ${getPriceColor(
        priceChange
      )}`}
    >
      {value}
    </span>
  );
};

// Token Icon Component
const TokenIcon = ({ symbol, color }) => {
  const getTokenIcon = (symbol) => {
    switch (symbol) {
      case "BTC":
        return (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
            style={{ backgroundColor: color }}
          >
            ₿
          </div>
        );
      case "ETH":
        return (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
            style={{ backgroundColor: color }}
          >
            Ξ
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg bg-gray-500">
            {symbol.charAt(0)}
          </div>
        );
    }
  };

  return getTokenIcon(symbol);
};

// Change Indicator Component
const ChangeIndicator = ({ change, pct }) => {
  const isPositive = change >= 0;

  return (
    <div
      className={`flex items-center gap-1 ${
        isPositive ? "text-green-600" : "text-red-600"
      }`}
    >
      <span className="text-sm">
        {isPositive ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span className="font-semibold text-sm">{pct}</span>
    </div>
  );
};

const BoxTablePerformance = ({
  title = "Top performance altcoin",
  columns = columnsExample,
  data = allData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full h-full mx-auto">
      <div className="w-full h-full  relative bg-white rounded-md shadow-md border border-gray-200 ">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Table Container */}
        <div className="w-auto">
          <table className="w-full h-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50/50">
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className={`px-5 py-2 text-left text-sm font-semibold text-gray-800 border-b border-gray-200 ${
                      index === columns.length - 1 ? "text-start" : ""
                    }`}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/70 transition-all duration-200 group border border-gray-200 last:border-b-0"
                >
                  <td className="px-4 py-2 text-start">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.id}
                    </span>
                  </td>

                  {/* Token Column with Icon */}
                  <td className="px-5 py-2">
                    <div className="flex items-center gap-3">
                      <TokenIcon symbol={item.symbol} color={item.color} />
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-medium text-sm">
                          {item.symbol}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Value Column with Dynamic Color */}
                  <td className="px-4 py-2 text-start">
                    <PriceDisplay
                      value={item.value}
                      priceChange={item.priceChange}
                    />
                  </td>

                  {/* Change 24h Column with Color and Arrow */}
                  <td className="px-4 py-2 text-start">
                    <ChangeIndicator change={item.change} pct={item.pct} />
                  </td>

                  {/* USD Column */}
                  <td className="px-5 py-2 text-start">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.usd}
                    </span>
                  </td>

                  {/* Volume Column */}
                  <td className="px-5 py-2 text-start">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.volume}
                    </span>
                  </td>

                  {/* Supply Column */}
                  {/* Supply Column with Progress Bar */}
                  <td className="px-5 py-2 text-start">
                    <SupplyProgressBar
                      supply={item.supply}
                      percentage={item.supplyPercentage}
                      tokenColor={item.color}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="absolute w-full rounded-b-md bottom-[-50px] px-5 py-3 bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xs text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{" "}
                {data.length} entities
              </p>
              <div className="flex items-center gap-2 bg-green-100 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">Live</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="w-6 h-6 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="text-xs text-gray-400">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <span className="text-xs text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="w-6 h-6 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxTablePerformance;
