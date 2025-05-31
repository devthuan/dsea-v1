import React, { useState } from "react";

const allData = [
  {
    id: 1,
    holder: "Binance: BTC (0x9877)",
    value: "$342,85K",
    pct: "24,97%",
    usd: "$342,85K",
  },
  {
    id: 2,
    holder: "Coinbase: ETH (0x4f2a)",
    value: "$287,32K",
    pct: "19,83%",
    usd: "$287,32K",
  },
  {
    id: 3,
    holder: "Kraken: BTC (0x8c55)",
    value: "$195,67K",
    pct: "13,52%",
    usd: "$195,67K",
  },
  {
    id: 4,
    holder: "Gemini: ETH (0x7a91)",
    value: "$156,89K",
    pct: "10,84%",
    usd: "$156,89K",
  },
  {
    id: 5,
    holder: "Huobi: BTC (0x3e44)",
    value: "$134,22K",
    pct: "9,27%",
    usd: "$134,22K",
  },
  {
    id: 6,
    holder: "OKEx: ETH (0x9c77)",
    value: "$98,45K",
    pct: "6,81%",
    usd: "$98,45K",
  },
  {
    id: 7,
    holder: "Bitfinex: BTC (0x5d88)",
    value: "$87,31K",
    pct: "6,04%",
    usd: "$87,31K",
  },
  {
    id: 8,
    holder: "FTX: ETH (0x2a66)",
    value: "$76,92K",
    pct: "5,32%",
    usd: "$76,92K",
  },
  {
    id: 9,
    holder: "Bitstamp: BTC (0x8f33)",
    value: "$54,18K",
    pct: "3,74%",
    usd: "$54,18K",
  },
  {
    id: 10,
    holder: "KuCoin: ETH (0x4b99)",
    value: "$42,67K",
    pct: "2,95%",
    usd: "$42,67K",
  },
  {
    id: 11,
    holder: "Crypto.com: BTC (0x6e55)",
    value: "$38,91K",
    pct: "2,69%",
    usd: "$38,91K",
  },
  {
    id: 12,
    holder: "Bybit: ETH (0x1c22)",
    value: "$29,84K",
    pct: "2,06%",
    usd: "$29,84K",
  },
  {
    id: 13,
    holder: "Gate.io: BTC (0x9e88)",
    value: "$25,73K",
    pct: "1,78%",
    usd: "$25,73K",
  },
  {
    id: 14,
    holder: "Bittrex: ETH (0x7f44)",
    value: "$19,56K",
    pct: "1,35%",
    usd: "$19,56K",
  },
  {
    id: 15,
    holder: "Poloniex: BTC (0x3d77)",
    value: "$14,82K",
    pct: "1,02%",
    usd: "$14,82K",
  },
];

const columnsExample = [
  { name: "Holder" },
  { name: "Value" },
  { name: "PCT" },
  { name: "USD" },
];

const ITEMS_PER_PAGE = 8;

const TableCustom = ({
  title = "Entities",
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
    <div className="w-full h-[583px] mx-auto p-2">
      <div className="w-full h-full relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full ">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50/50">
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className={`px-5 py-2 text-left text-sm font-semibold text-gray-800 border-b border-gray-200 ${
                      index === columns.length - 1 ? "text-right" : ""
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
                  className="hover:bg-gray-50/70 transition-all duration-200 group border-b border-gray-100/50 last:border-b-0"
                >
                  {/* Holder Column */}
                  <td className="px-5 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        {item.holder}
                      </span>
                    </div>
                  </td>

                  {/* Value Column */}
                  <td className="px-4 py-2 text-right">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.value}
                    </span>
                  </td>

                  {/* PCT Column */}
                  <td className="px-4 py-2 text-right">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.pct}
                    </span>
                  </td>

                  {/* USD Column */}
                  <td className="px-5 py-2 text-right">
                    <span className="text-gray-800 font-semibold text-sm">
                      {item.usd}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {/* Footer with Pagination */}
        <div className="absolute w-full bottom-0 px-5 py-3 bg-gradient-to-r from-gray-50 to-slate-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xs text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of{" "}
                {allData.length} entities
              </p>
              <div className="flex items-center gap-2 bg-green-100 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
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

export default TableCustom;
