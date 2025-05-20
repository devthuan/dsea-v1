import { useEffect, useRef, useState } from "react";
import ButtonCustom from "@/components/ButtonCustom/ButtonCustom";
const  TabButtons = ({ tabs, activeTab, onTabClick, tabType="type1" }) => {
  // Tạo một đối tượng chứa các kiểu tab khác nhau

  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeButton = container.querySelector(".active-tab");

    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({
        left: offsetLeft - 4,
        width: offsetWidth + 9,
      });
    }
  }, [activeTab, tabs]);

  const tabTypes = {
    type1: (
      <div
        ref={containerRef}
        className="relative h-6 w-fit py-4 rounded-[15px] bg-white shadow outline-offset-[-1px]  inline-flex justify-start items-center px-1"
      >
        {/* Nền chuyển động */}
        <div
          className="absolute h-8 bg-[var(--primary)] rounded-[15px] transition-all duration-300"
          style={{
            ...indicatorStyle,
          }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative z-10 rounded-[20px] text-xs w-14 h-6  transition-all ${
              activeTab === tab.id
                ? "text-white font-semibold active-tab "
                : "hover:text-[var(--text)] text-black/80"
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    ),
    type2: (
      <div
        ref={containerRef}
        className="relative h-9 w-auto py-4 rounded-[15px] bg-white shadow outline-offset-[-1px]  inline-flex justify-start items-center px-1"
      >
        {/* Nền chuyển động */}
        <div
          className="absolute h-9 bg-[var(--primary)] rounded-[15px] transition-all duration-300"
          style={{
            ...indicatorStyle,
          }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative z-10 rounded-[20px] text-base w-32 h-6  transition-all ${
              activeTab === tab.id
                ? "text-white font-semibold active-tab "
                : "hover:text-[var(--text)] text-black/80"
            }`}
            onClick={() => onTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    ),
  };

  return tabTypes[tabType]
};

export default TabButtons;
