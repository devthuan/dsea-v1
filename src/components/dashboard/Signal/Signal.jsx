import React, { useState } from "react";
import { Bell } from "lucide-react";
import { images } from "@/assets";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Signal() {
  const [chain, setChain] = useState("All Chain");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Chain options with logos
  const chainOptions = [
    { id: "all", name: "All Chain", logo: "All" },
    { id: "eth", name: "Ethereum", logo: images.ethIcon },
    { id: "btc", name: "Bitcoin", logo: images.btcIcon },
    { id: "sol", name: "Solana", logo: images.solIcon },
    { id: "bnb", name: "Binance", logo: images.bnbIcon },
  ];

  // const selectedChain =
  //   chainOptions.find((option) => option.name === chain) || chainOptions[0];

  const handleChainSelect = (selectedChain) => {
    setChain(selectedChain.name);
    setIsDropdownOpen(false);
  };

  // Mock data for signal cards
  const signalCards = [
    {
      title: "PEPE",
      time: "6h ago",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      title: "NFT Volume",
      time: "6h ago",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      title: "Top Whales",
      time: "6h ago",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      title: "NFT Volume",
      time: "6h ago",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  return (
    <div className="h-full bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Signal</h1>
          <Select className="cursor-pointer">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {chainOptions?.map((item,index) => {
                  return (
                    <SelectItem
                      key={index}
                      value={item.name}
                      className="flex items-center gap-2"
                      onClick={() => handleChainSelect(item)}
                    >
                      <span className="inline-block w-5 h-5  items-center justify-center text-xs bg-gray-100 rounded-full">
                        <img src={item.logo} alt=""  />
                      </span>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-gray-100 text-sm">
            <span className="bg-gray-300 rounded-full w-4 h-4"></span>
            Create Alert
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full bg-white text-sm">
            <Bell size={16} />
            Create Alert
          </button>
        </div>
      </div>

      {/* Signal Cards */}
      <div className="w-full px-8">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className={""}>
            {signalCards.map((card, index) => (
              <CarouselItem
                key={index}
                className="mr-3 basis-1/3 bg-white p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-3 ">
                  <div className="bg-gray-200 rounded-full w-6 h-6"></div>
                  <div className="bg-gray-200 rounded-full w-6 h-6"></div>
                  <span className="font-medium">{card.title}</span>
                  <span className="text-xs text-gray-500">{card.time}</span>
                </div>

                <p className="text-sm">
                  <span className="text-blue-400">Lorem Ipsum</span> is simply
                  dummy text of the printing and typesetting industry
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className={"cursor-pointer"} />
          <CarouselNext className={"cursor-pointer"} />
        </Carousel>
      </div>

      {/* Horizontal dividers */}
      {/* <div className="mt-6 border-t border-gray-200"></div> */}
    </div>
  );
}
