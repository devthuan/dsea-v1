import { useState } from "react";
// import TableCustom from "../../TableCustom/TableCustom";
// import TabButtons from "../../TabButtons/TabButtons";
import TableCustom from "@/components/TableCustom/TableCustom";
import TabButtons from "@/components/TabButtons/TabButtons";

const BoxTableToken = () => {
  const [activeTab, setActiveTab] = useState("flows");

  const tabsData = [
    { id: "flows", label: "Chain" },
    { id: "aum", label: "Asset" },
    { id: "marketCap", label: "Category" },
  ];


  return (
    <div className="w-full h-full p-[25px]">
      <div className="w-full flex justify-between">
        <div className="">search
            <input type="text" />

        </div>
        <div className="">
          <TabButtons
                      tabs={tabsData}
            activeTab={activeTab}
            onTabClick={setActiveTab}
            tabType="type3"
          />
        </div>
      </div>
      <div className="">
        <TableCustom/>
      </div>
    </div>
  );
};

export default BoxTableToken;
