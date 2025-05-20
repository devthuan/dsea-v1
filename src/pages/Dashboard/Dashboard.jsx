import BitcoinNetFlow from "@/components/dashboard/BitcoinNetFlow/BitcoinNetFlow";
import BoxHeapMap from "@/components/dashboard/BoxHeapMap/BoxHeapMap";
import BoxNarrativePerformance from "@/components/dashboard/BoxNarrativePerformance/BoxNarrativePerformance";
import { BoxPerform } from "@/components/dashboard/BoxPerform/BoxPerform";
import Signal from "@/components/dashboard/Signal/Signal";
import StableCoinNetFlow from "@/components/dashboard/StableCoinNetFlow/StableCoinNetFlow";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div className="">
      <div className="mb-3">
        <Signal />
      </div>
      <div className="h-auto grid auto-rows-min gap-4 md:grid-cols-2">
        <div className=" rounded-xl bg-muted/50">
          <BitcoinNetFlow />
        </div>
        <div className=" rounded-xl bg-muted/50">
          <StableCoinNetFlow />
        </div>
      </div>

      <div className="min-h-[50vh] mt-3 flex-1 rounded-xl bg-muted/50 md:min-h-min ">
        <BoxNarrativePerformance />
      </div>

      <div className="h-auto mt-3 grid auto-rows-min gap-4 md:grid-cols-2">
        <div className=" rounded-xl bg-muted/50">
          <BoxHeapMap />
        </div>
        <div className=" rounded-xl bg-muted/50">
          {/* <StableCoinNetFlow /> */}
          <BoxPerform />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
