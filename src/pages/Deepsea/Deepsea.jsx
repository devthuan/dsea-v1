"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import CryptoPieChart from "@/components/charts/PieChart/CryptPieChart";
import NetFlowChart from "@/components/charts/netFlowChart/NetFlowChart";
import NetFlowChartCustom from "@/components/charts/netFlowChart/NetFlowChartCustom";
import { truncateAddress } from "@/util/truncateAddress";
import TableDeepsea from "@/components/TableCustom/TableDeepsea";
import TableCustom from "@/components/TableCustom/TableCustom";
import TableAsset from "@/components/deepsea/TableAsset/tableAsset";
import TableHistory from "@/components/deepsea/TableHistory/TableHistory";

export default function Deepsea() {
  const [activeTab, setActiveTab] = useState("details");
  const [copiedAddress, setCopiedAddress] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(text);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto p-4 ">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            Crypto Market Insights and Analytics
          </h1>
          <p className="text-gray-500 text-sm">
            TOP Cryptocurrencies Price List by Market Capitalization.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2  border rounded-xl overflow-hidden">
          {/* Left Column - Whales List */}
          <div className="lg:col-span-4 border-r">
            <div className=" pt-4">
              <div className="relative mb-4 mx-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Bitcoin, Ethereum..."
                  className="pl-10 bg-gray-100"
                />
              </div>

              <Tabs defaultValue="chain" className="w-full">
                <TabsList className="mb-4 mx-4">
                  <TabsTrigger value="chain" className="">
                    Chain
                  </TabsTrigger>
                  <TabsTrigger value="asset">Asset</TabsTrigger>
                  <TabsTrigger value="category">Category</TabsTrigger>
                </TabsList>

                <TabsContent value="chain">
                  <WhalesList />
                </TabsContent>
                <TabsContent value="asset">
                  <WhalesList />
                </TabsContent>
                <TabsContent value="category">
                  <WhalesList />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Middle Column - Details and Charts */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="mb-4 mt-4">
                <TabsTrigger value="details" className="">
                  Details
                </TabsTrigger>
                <TabsTrigger value="asset">Asset</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {/* Details Section */}
                  <div className="p-4 border-r-2">
                    <Tabs defaultValue="asset" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="asset" className="">
                          Holding by asset
                        </TabsTrigger>
                        <TabsTrigger value="trending">
                          Holding by trends
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="asset">
                        <PortfolioChart />
                      </TabsContent>
                      <TabsContent value="trending">
                        <PortfolioChart />
                      </TabsContent>
                    </Tabs>
                  </div>

                  {/* Flow Chart Section */}
                  <div className="flex justify-center items-center">
                    <FlowChart />
                  </div>
                </div>

                {/* Details Table */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 border-t">
                  <div>
                    <h3 className="font-bold mb-2">Shark's label</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Shark's label</span>
                          <span className="font-medium">MEME</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Address</span>
                          <span className="flex items-center gap-1">
                            <span className="text-sm font-mono  bg-gray-100  py-1 px-2 rounded-sm">
                              {truncateAddress(
                                "0x5A0f8266D491274B613fC23bB8289535ee9cF258"
                              )}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  "0x5A0f8266D491274B613fC23bB8289535ee9cF258"
                                )
                              }
                              // className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                            >
                              {copiedAddress ===
                              "0x5A0f8266D491274B613fC23bB8289535ee9cF258" ? (
                                <Check className="w-3 h-3 text-green-600" />
                              ) : (
                                <Copy className="w-3 h-3 text-gray-500" />
                              )}
                            </button>
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Total Txn</span>
                          <span className="font-medium">975</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Ngày tạo ví</span>
                          <span className="font-medium">
                            08/02/2021 04:47:65 SA
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Total asset</span>
                          <span className="font-medium">$72,765,865</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">
                            Tổng giá trị nạp
                          </span>
                          <span className="font-medium">$102,976,765</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">
                            Tổng giá trị rút
                          </span>
                          <span className="font-medium">$58,987,235</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Performance</h3>
                    <div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Giá trị đầu tư ban đầu (!)
                        </span>
                        <span className="font-medium">$12,876</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">% PNL</span>
                        <span className="font-medium text-green-600">
                          35.38%
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Best performing asset
                        </span>
                        <span className="font-medium text-green-600">
                          $PEPE
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">
                          Recommended asset(!)
                        </span>
                        <span className="font-medium">$TURBO</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Profit and loss</span>
                        <span className="font-medium text-green-600">
                          $2,765,865
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="asset">
                <TableAsset />
              </TabsContent>
              <TabsContent value="history">
                <TableHistory />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhalesList() {
  const whales = [
    {
      id: "14679",
      tags: ["MEME", "Metaverse", "NFT"],
      value: "$26,643,976",
      change: -12.64,
    },
    {
      id: "43779",
      tags: ["RWA", "Metaverse", "gamefi"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "14529",
      tags: ["DEFI", "Metaverse", "DEFI"],
      value: "$26,643,976",
      change: -12.64,
    },
    {
      id: "56879",
      tags: ["NFT", "AI", "MEME"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "25832",
      tags: ["RWA", "Metaverse", "gamefi"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "57832",
      tags: ["RWA", "Metaverse"],
      value: "$26,643,976",
      change: -12.64,
    },
    {
      id: "56784",
      tags: ["AI", "AI AGENTS"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "53678",
      tags: ["Rune BTC", "Metaverse", "gamefi"],
      value: "$26,643,976",
      change: -12.64,
    },
    {
      id: "24689",
      tags: ["RWA", "Metaverse", "gamefi"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "75326",
      tags: ["DEFI", "Metaverse"],
      value: "$26,643,976",
      change: 4.63,
    },
    {
      id: "14679",
      tags: ["AI AGENTS", "MEME", "gamefi"],
      value: "$26,643,976",
      change: -12.64,
    },
    {
      id: "45368",
      tags: ["SOL", "Metaverse", "RWA"],
      value: "$26,643,976",
      change: 4.63,
    },
    { id: "75367", tags: ["AI", "NFT"], value: "$26,643,976", change: 4.63 },
  ];

  return (
    <div className="">
      {/* {whales.map((whale, index) => (
        <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <span className="font-medium">Whale {whale.id}</span>
            </div>
            <div className="flex items-center">
              <span
                className={`text-sm ${
                  whale.change > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {whale.change > 0 ? (
                  <ChevronUp className="inline h-4 w-4" />
                ) : (
                  <ChevronDown className="inline h-4 w-4" />
                )}
                {Math.abs(whale.change)}%
              </span>
            </div>
          </div>
          <div className="flex gap-1 mb-1">
            {whale.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-right font-medium">{whale.value}</div>
        </div>
      ))} */}
      <TableDeepsea />
    </div>
  );
}

function PortfolioChart() {
  return (
    <div className="relative aspect-square">
      <CryptoPieChart />
    </div>
  );
}

function FlowChart() {
  return (
    <div className="h-[350px] w-full relative">
      <NetFlowChartCustom />
    </div>
  );
}
