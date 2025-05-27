import TableCustom from "@/components/TableCustom/TableCustom";
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
  { name: "% ví shark đang có lời" },
  { name: "Value" },
  { name: "Profit" },
  { name: "USD" },
];



const BoxSharkWallet = () => {
  
  return (
    <div className="w-full max-w-4xl mx-auto ">
      <TableCustom title="Shark's wallet" data={allData} columns={columnsExample} />
    
    </div>
  );
};

export default BoxSharkWallet;
