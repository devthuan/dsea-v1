"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const allData = [
  {
    id: 1,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 2,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 3,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 4,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 5,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 6,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 7,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 8,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 9,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 10,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 11,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 13.64,
    pnlDirection: "down",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
  {
    id: 12,
    name: "ANT (Aragon)",
    price: "$3.87",
    rank: "867",
    tags: ["Metaverse", "gamefi", "NFT"],
    quantity: 258,
    pnl: 0.62,
    pnlDirection: "up",
    totalTxn: "$1,998.436",
    total: "$998.46",
  },
];

const columnsExample = [
  { name: "Icon" },
  { name: "Crypto" },
  { name: "Quantity" },
  { name: "PNL" },
  { name: "Total TXN" },
  { name: "Total" },
];

const ITEMS_PER_PAGE = 8;

const TableAsset = ({
  title = "Crypto Portfolio",
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
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full mx-auto ">
      <div className="w-full h-full relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <h1 className="text-base font-medium text-gray-900">{title}</h1>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-50/30">
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className={`px-4 py-2 text-left text-xs font-medium text-gray-600 ${
                      index >= 2 ? "text-center" : ""
                    }`}
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {currentData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  {/* Icon Column */}
                  <td className="px-4 py-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                  </td>

                  {/* Crypto Column */}
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-900 text-xs">
                          {item.name}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {item.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-wrap">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-700">
                          Rank {item.rank}
                        </span>
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Quantity Column */}
                  <td className="px-4 py-2 text-center">
                    <span className="text-gray-900 font-medium text-xs">
                      {item.quantity}
                    </span>
                  </td>

                  {/* PNL Column */}
                  <td className="px-4 py-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {item.pnlDirection === "up" ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                      <span
                        className={`font-medium text-xs ${
                          item.pnlDirection === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.pnl}%
                      </span>
                    </div>
                  </td>

                  {/* Total TXN Column */}
                  <td className="px-4 py-2 text-center">
                    <span className="text-gray-900 font-medium text-xs">
                      {item.totalTxn}
                    </span>
                  </td>

                  {/* Total Column */}
                  <td className="px-4 py-2 text-center">
                    <span className="text-gray-900 font-medium text-xs">
                      {item.total}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className=" w-full bottom-0 px-4 py-2 bg-gray-50/30 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-[10px] text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of{" "}
                {allData.length} entries
              </p>
              <div className="flex items-center gap-2 bg-green-100 rounded-full px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-[10px] text-gray-600">Live</span>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-0.5 text-[10px] text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="w-6 h-6 rounded text-[10px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="text-[10px] text-gray-400">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-6 h-6 rounded text-[10px] font-medium transition-colors ${
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
                      <span className="text-[10px] text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="w-6 h-6 rounded text-[10px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
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
                className="px-2 py-0.5 text-[10px] text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
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

export default TableAsset;
