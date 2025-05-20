import CandlestickVolume from "@/components/charts/CandlestickVolume/CandlestickVolume";
import ChartWithDrawingTools from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";
// import ChartWithDrawingToolbar from "@/components/charts/CandlestickVolume/ChartWithDrawingToolbar";

const Candle = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* <CandlestickVolume /> */}
      <ChartWithDrawingTools />
    </div>
  );
};

export default Candle;
