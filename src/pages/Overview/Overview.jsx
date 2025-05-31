import BoxEntites from "@/components/overview/BoxEntites/BoxEntites";
import BoxFOT from "@/components/overview/BoxFOT/BoxFOT";
import BoxInformationDetailToken from "@/components/overview/BoxInformationDetailToken/BoxInformationDetailToken";
import BoxRealTimeTXS from "@/components/overview/BoxRealTimeTXS/BoxRealTimeTXS";
import BoxSharkWallet from "@/components/overview/BoxSharkWallet/BoxSharkWallet";
import BoxTokenNetFlow from "@/components/overview/BoxTokenNetFlow/BoxTokenNetFlow";

export const Overview = () => {
  return (
    <div className={"w-full h-full px-4"}>
      <div className="justify-start text-black text-2xl font-semibold ">
        Crypto Market Insights and Analytics
      </div>
      <div className="justify-center text-[#8a8a8a] text-sm font-normal  mt-[5px]">
        TOP Cryptocurrencies Price List by Market Capitalization.
      </div>

      <div className="my-[30px] flex gap-2 ">
        <BoxInformationDetailToken />
      </div>

      <div className="mt-[30px] w-full h-full max-h-[584px] grid grid-cols-2 gap-2">
        <div className="w-full h-full ">
          <BoxEntites />
        </div>
        <div className="w-full h-full ">
          <BoxSharkWallet />
        </div>
      </div>

      <div className="mt-[30px] ">
        <BoxTokenNetFlow />
      </div>
      
      <div className="mt-[30px] ">
        <BoxRealTimeTXS />
      </div>
      <div className="mt-[30px] ">
        <BoxFOT />
      </div>
    </div>
  );
};
