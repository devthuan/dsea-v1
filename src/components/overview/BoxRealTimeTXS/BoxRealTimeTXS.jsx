import TableCustom from "@/components/TableCustom/TableCustom";
import { images } from "../../../assets";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";



const ITEMS_PER_PAGE = 8;

const data = [
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowDownIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
];

const coloums = [
  {name: "Time"},
   {name: "From"},
   {name: "To"},
   {name: "Value"},
   {name: "Token"},
   {name: "USD"}
  ];

const BoxRealTimeTXS = () => {
  return (
    <div className="w-full h-full">
      <TableComponent title="Real-time TXS" columns={coloums} data={data} />
    </div>
  );
};

const TableComponent = ({title, columns, data}) => {
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
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
  
      return pages;
    };

    const truncateAddress = (address) => {
      if (!address) return "";
      return `${address.slice(0, 12)}...${address.slice(-12)}`;
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

    const getTokenColor = (token) => {
      const colors = {
        BTC: "text-orange-600 bg-orange-50",
        ETH: "text-blue-600 bg-blue-50",
        USDT: "text-green-600 bg-green-50",
      };
      return colors[token] || "text-gray-600 bg-gray-50";
    };


    return (
      <div className="w-full h-[583px] mx-auto p-2">
        <div className="w-full h-full relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5  from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    {title}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Live blockchain transactions
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto px-6">
            <table className="w-full ">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50/80">
                  {columns?.map((col, index) => (
                    <th
                      key={index}
                      className={` py-2 text-left text-xs font-bold  uppercase tracking-wider border-b border-gray-200 ${
                        index === columns.length - 1 ? "text-right" : ""
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
                    className="hover:bg-gray-50/70 transition-all duration-200 group"
                  >
                    {/* Time Column */}
                    <td className=" py-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">
                          {item.time}
                        </span>
                      </div>
                    </td>

                    {/* From Column */}
                    <td className=" py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono  bg-gray-100  py-1 rounded-md">
                          {truncateAddress(item.from)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.from, "from")}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedAddress === `from-${item.from}` ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* To Column */}
                    <td className=" py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono text-gray-800 bg-gray-100  py-1 rounded-md">
                          {truncateAddress(item.to)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.to, "to")}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                        >
                          {copiedAddress === `to-${item.to}` ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Value Column */}
                    <td className=" py-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {item.value}
                      </span>
                    </td>

                    {/* Token Column */}
                    <td className=" py-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTokenColor(
                          item.token
                        )}`}
                      >
                        {item.token}
                      </span>
                    </td>

                    {/* USD Column */}
                    <td className=" py-1 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.USD}
                        </span>
                        <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
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
                  Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of{" "}
                  {data.length} entities
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
}

export default BoxRealTimeTXS;
