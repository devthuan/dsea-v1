"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { truncateAddress } from "@/util/truncateAddress";

const allData = [
  {
    id: 1,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "0x578f8e4tgdy6335hf742fgj346",
      to: "ví",
      direction: "in",
    },
    oldPrice: {
      amount: "+499.563.00",
      currency: "USDT",
      rate: "@1.00",
      total: "$500.992.00",
      type: "positive",
    },
    newPrice: {
      amount: "$500.458.00",
      percentage: "+1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 2,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 3,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "0x578f8e4tgdy6335hf742fgj346",
      to: "ví",
      direction: "in",
    },
    oldPrice: {
      amount: "+499.563.00",
      currency: "USDT",
      rate: "@1.00",
      total: "$500.992.00",
      type: "positive",
    },
    newPrice: {
      amount: "$500.458.00",
      percentage: "+1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 4,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 5,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 6,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "0x578f8e4tgdy6335hf742fgj346",
      to: "ví",
      direction: "in",
    },
    oldPrice: {
      amount: "+499.563.00",
      currency: "USDT",
      rate: "@1.00",
      total: "$500.992.00",
      type: "positive",
    },
    newPrice: {
      amount: "$500.458.00",
      percentage: "+1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 7,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 8,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 9,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "0x578f8e4tgdy6335hf742fgj346",
      to: "ví",
      direction: "in",
    },
    oldPrice: {
      amount: "+499.563.00",
      currency: "USDT",
      rate: "@1.00",
      total: "$500.992.00",
      type: "positive",
    },
    newPrice: {
      amount: "$500.458.00",
      percentage: "+1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 10,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 11,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "Ví",
      to: "0x578f8e4tgdy6335hf742fgj346",
      direction: "out",
    },
    oldPrice: {
      amount: "-750.358.00",
      currency: "USDC",
      rate: "@1.00",
      total: "$750.560.00",
      type: "negative",
    },
    newPrice: {
      amount: "$750.023.00",
      percentage: "-1.02 %",
      rate: "@1.00",
    },
  },
  {
    id: 12,
    date: "2/22/2025",
    time: "11:53:57 SA",
    transaction: {
      from: "0x578f8e4tgdy6335hf742fgj346",
      to: "ví",
      direction: "in",
    },
    oldPrice: {
      amount: "+499.563.00",
      currency: "USDT",
      rate: "@1.00",
      total: "$500.992.00",
      type: "positive",
    },
    newPrice: {
      amount: "$500.458.00",
      percentage: "+1.02 %",
      rate: "@1.00",
    },
  },
];

const columnsExample = [
  { name: "Time" },
  { name: "Transaction" },
  { name: "Giá cũ" },
  { name: "Giá mới" },
];

const ITEMS_PER_PAGE = 10;

const TableHistory = ({
  title = "Transaction History",
  columns = columnsExample,
  data = allData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState(null);

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

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(`${type}-${text}`);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full mx-auto ">
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className="bg-white border-b border-gray-200">
                {columns?.map((col, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-base font-semibold text-gray-900"
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
                  className="border-b border-gray-100 hover:bg-gray-50/30 transition-colors"
                >
                  {/* Time Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-900 font-medium">
                        {item.date}
                      </span>
                      <span className="text-sm text-gray-600">{item.time}</span>
                    </div>
                  </td>

                  {/* Transaction Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 font-mono">
                        {truncateAddress(item.transaction.from)}
                        <button
                          onClick={() =>
                            copyToClipboard(`${item.transaction.from}`, item.id)
                          }
                          // className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedAddress ===
                          `${item.id}-${item.transaction.from}` ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                        </button>
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 font-mono">
                        {truncateAddress(item.transaction.to)}
                        <button
                          onClick={() =>
                            copyToClipboard(`${item.transaction.to}`, item.id)
                          }
                          // className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedAddress ===
                          `${item.id}-${item.transaction.to}` ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                        </button>
                      </span>
                    </div>
                  </td>

                  {/* Giá cũ Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          item.oldPrice.type === "positive"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {item.oldPrice.amount} {item.oldPrice.currency}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.oldPrice.rate} {item.oldPrice.total}
                      </span>
                    </div>
                  </td>

                  {/* Giá mới Column */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 font-medium">
                          {item.newPrice.amount}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            item.newPrice.percentage.startsWith("+")
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {item.newPrice.percentage}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {item.newPrice.rate}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination */}
        <div className="px-6 py-3 bg-gray-50/30 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of{" "}
                {allData.length} transactions
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
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 mx-2">
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="w-8 h-8 rounded text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      1
                    </button>
                    {currentPage > 4 && (
                      <span className="text-sm text-gray-400">...</span>
                    )}
                  </>
                )}

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
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
                      <span className="text-sm text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className="w-8 h-8 rounded text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
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
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
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

export default TableHistory;
