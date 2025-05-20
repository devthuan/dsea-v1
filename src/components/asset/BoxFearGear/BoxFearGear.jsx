import { useState } from "react";

const BoxFearGear = () => {
  const dataExample = [
    { time: "2024-03-01", value: 45000 },
    { time: "2024-03-02", value: 46000 },
    { time: "2024-03-03", value: 45500 },
    { time: "2024-03-04", value: 47000 },
    { time: "2024-03-05", value: 45000 },
    { time: "2024-03-06", value: 46000 },
    { time: "2024-03-07", value: 45500 },
    { time: "2024-03-08", value: 47000 },
    { time: "2024-03-09", value: 49000 },
    { time: "2024-03-10", value: 57000 },
    { time: "2024-03-11", value: 77000 },
    { time: "2024-03-12", value: 27000 },
    { time: "2024-03-13", value: 97000 },
    { time: "2024-03-14", value: 77000 },
    { time: "2024-03-15", value: 67000 },
    { time: "2024-03-16", value: 47000 },
  ];
  const [activeTabTime, setActiveTabTime] = useState("24h");

  const tabsTime = [
    { id: "1h", label: "1h" },
    { id: "3h", label: "3h" },
    { id: "1d", label: "1d" },
    { id: "1w", label: "1w" },
    { id: "1m", label: "1m" },
  ];

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-white/70 shadow-md rounded-[32px] p-[24px] flex flex-col gap-y-[16px]">
        <h1 className="h-auto justify-start text-black text-2xl font-semibold font-['Inter']">
          Fear & Gear Index
        </h1>
        <div className="w-full h-full grid grid-cols-3 gap-4">
          <div className="col-span-2  w-full h-full border-[1px] border-black rounded-[32px] p-[32px]">
            <div className="w-[156px] h-[156px] bg-[#d9d9d9] rounded-full flex justify-center items-center">
              <div className="justify-start text-black text-[40px] font-semibold font-['Inter']">
                87
              </div>
            </div>
            <h1 className="mt-[20px] justify-start text-black text-2xl font-semibold font-['Inter']">
              Distribution of letters
            </h1>
            <p className="mt[10px] w-full justify-center text-[#8a8a8a] text-sm font-normal font-['Inter']">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="inline-flex justify-start items-center gap-3">
                <div className="w-12 h-12 px-[13px] py-[15px] bg-[#d9d9d9] rounded-3xl inline-flex flex-col justify-center items-center gap-2.5">
                  <div className="justify-start text-black text-sm font-semibold font-['Inter']">
                    87
                  </div>
                </div>
                <div className="w-auto inline-flex flex-col justify-start items-start gap-1">
                  <div className="self-stretch justify-start text-black text-base font-semibold font-['Inter']">
                    Yesterday
                  </div>
                  <div className="self-stretch justify-start text-[#8a8a8a] text-[10px] font-normal font-['Inter']">
                    Distribution of letters
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxFearGear;
