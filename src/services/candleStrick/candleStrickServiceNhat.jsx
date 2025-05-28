import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import CandleStrickNhat from "@/contracts/CandleStrickNhat.json";

export const candleStrickServiceNhat = {
  fetchData: async () => {
    let now = new Date();
    const startTime = now.getTime();
    const endTime = now.getTime() - 10 * 24 * 60 * 60 * 1000;
    const ddmmyyyy = new Date(startTime)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "_"); // dd_mm_yyyy now
    console.log(ddmmyyyy);
    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const contractData = CandleStrickNhat["CandleStrick"];

    console.log("check address proxy: ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "initCandle",
      "BTCUSDT",
      "1m",
      100
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

    console.log("check data from service:", result);
    const formattedData = result.map((item) => {
      return {
        time: Number(item.openTime) / 1000,
        openTime: Number(item.openTime),
        closeTime: Number(item.closeTime),
        open: Number(toUnits(item.openPrice, 8)), // Chuyển chuỗi thành số
        high: Number(toUnits(item.highPrice, 8)),
        low: Number(toUnits(item.lowPrice, 8)),
        close: Number(toUnits(item.closePrice, 8)),
        volume: Number(toUnits(item.volume, 8)),
        quoteVolume: Number(toUnits(item.quoteAssetVolume, 8)),
        firstTradeID: Number(toUnits(item.firstTradeID, 8)),
        lastTradeID: Number(toUnits(item.lastTradeID, 8)),
        tradeCount: Number(toUnits(item.numberOfTrades, 8)),
        isClosed: item.isClosed || true,
      };
    });
    // check opentime trùng nhau
    formattedData.sort((a, b) => a.openTime - b.openTime);
    const uniqueData = formattedData.filter((item, index, self) => {
      return index === 0 || item.openTime !== self[index - 1].openTime;
    });
    console.log("Formatted data:", formattedData);
    return uniqueData;
  },

  fetchDataOld: async (endTime) => {
    // let now = new Date();
    const startTime = endTime - 10 * 24 * 60 * 60 * 1000;

    console.log("endTime", endTime);
    console.log("endTime", endTime);

    const contractData = CandleStrickNhat["CandleStrick"];

    let result = await fetchDataSmartContract(
      contractData,
      "getCandlesInRange",
      endTime,
      startTime,
      100
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến lịch sử từ smart contract");
      return [];
    }

    console.log("check data from service:", result.length);
    const formattedData = result.map((item) => {
      return {
        time: Number(item.openTime) / 1000,
        openTime: Number(item.openTime),
        closeTime: Number(item.closeTime),
        open: Number(toUnits(item.open, 8)), // Chuyển chuỗi thành số
        high: Number(toUnits(item.high, 8)),
        low: Number(toUnits(item.low, 8)),
        close: Number(toUnits(item.close, 8)),
        volume: Number(toUnits(item.volume, 8)),
        quoteVolume: Number(toUnits(item.quoteVolume, 8)),
        firstTradeID: Number(toUnits(item.firstTradeID, 8)),
        lastTradeID: Number(toUnits(item.lastTradeID, 8)),
        tradeCount: Number(toUnits(item.tradeCount, 8)),
        isClosed: item.isClosed,
      };
    });

    formattedData.sort((a, b) => a.openTime - b.openTime);
    console.log("Formatted historical data:", formattedData);
    return formattedData;
  },

  listeningEvent: async ({ callback }) => {
    const contractData = CandleStrickNhat["CandleStrick"];

    await listenToEventSmartContract(contractData, "KlineCreated", (event) => {
      if (event) {
        const result = event.returnValues;
        const dataFormat = {
          time: Number(result.openTime) / 1000,
          openTime: Number(result.openTime),
          closeTime: Number(result.closeTime),
          open: Number(toUnits(result.open, 8)), // Chuyển chuỗi thành số
          high: Number(toUnits(result.high, 8)),
          low: Number(toUnits(result.low, 8)),
          close: Number(toUnits(result.close, 8)),
          volume: Number(toUnits(result.volume, 8)),
          quoteVolume: Number(toUnits(result.quoteVolume, 8)),
          firstTradeID: Number(toUnits(result.firstTradeID, 8)),
          lastTradeID: Number(toUnits(result.lastTradeID, 8)),
          tradeCount: Number(toUnits(result.tradeCount, 8)),
          isClosed: result.isClosed,
        };

        console.log("check event from service: ", dataFormat);
        callback(dataFormat);
      }
    });
  },
};
