import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import candleStrick from "@/contracts/candleStrick.json";



export const candleStrickService = {
  fetchData: async () => {
    let now = new Date();
    // const startTime = 1747966920000;  // now
    const startTime = now.getTime(); // now
    const endTime = now.getTime() - 10 * 24 * 60 * 60 * 1000; // 10 ngày trước

    console.log("startTime", startTime);
    console.log("endTime", endTime);

    let contractData = candleStrick["TestSMC"];

    let result = await fetchDataSmartContract(
      contractData,
      "getCandleByAmountAndTime",
      startTime,
      100
    );
    console.log("check data from service:dđ", result.length);
    const formattedData = result.map((item) => {
      return {
        openTime: Number(item.openTime),
        closeTime: Number(item.closeTime),
        open: toUnits(item.open, 8),
        high: toUnits(item.high, 8),
        low: toUnits(item.low, 8),
        close: toUnits(item.close, 8),
        volume: toUnits(item.volume, 8),
        quoteVolume: toUnits(item.quoteVolume, 8),
        firstTradeID: toUnits(item.firstTradeID, 8),
        lastTradeID: toUnits(item.lastTradeID, 8),
        tradeCount: toUnits(item.tradeCount, 8),
        isClosed: item.isClosed,
      };
    });

    // sort by openTime
    formattedData.sort((a, b) => a.openTime - b.openTime);
    console.log(formattedData);
    // let result = await fetchDataSmartContract(
    //   contractData,
    //   "getLength",

    // );
    // console.log(result);
    return formattedData;
  },
  fetchDataOld: async (startTime) => {
    let now = new Date();
    // const startTime = 1747966920000;  // now
    // const startTime = now.getTime()   // now
    const endTime = now.getTime() - 10 * 24 * 60 * 60 * 1000; // 10 ngày trước

    console.log("startTime", startTime);
    console.log("endTime", endTime);

    let contractData = candleStrick["TestSMC"];

    let result = await fetchDataSmartContract(
      contractData,
      "getCandleByAmountAndTime",
      startTime,
      100
    );
    console.log("check data from service:", result.length);
    const formattedData = result.map((item) => {
      return {
        openTime: Number(item.openTime),
        closeTime: Number(item.closeTime),
        open: toUnits(item.open, 8),
        high: toUnits(item.high, 8),
        low: toUnits(item.low, 8),
        close: toUnits(item.close, 8),
        volume: toUnits(item.volume, 8),
        quoteVolume: toUnits(item.quoteVolume, 8),
        firstTradeID: toUnits(item.firstTradeID, 8),
        lastTradeID: toUnits(item.lastTradeID, 8),
        tradeCount: toUnits(item.tradeCount, 8),
        isClosed: item.isClosed,
      };
    });

    // sort by openTime
    formattedData.sort((a, b) => a.openTime - b.openTime);
    console.log(formattedData);
    // let result = await fetchDataSmartContract(
    //   contractData,
    //   "getLength",

    // );
    // console.log(result);
    return formattedData;
  },
  listeningEvent: async ({ callback }) => {
    const dataContract = candleStrick["TestSMC"];
    await listenToEventSmartContract(dataContract, "CandleUpdated", (event) => {
      if (event) {
        const result = event.returnValues;
        // const timeStamp = Number(result.timestamp);

        // console.log("check event: ", result.close);
        // console.log("check event: ", result.openTime);

        const dataFormat = {
          openTime: Number(result.openTime),
          closeTime: Number(result.closeTime),
          open: toUnits(result.open, 8),
          high: toUnits(result.high, 8),
          low: toUnits(result.low, 8),
          close: toUnits(result.close, 8),
          volume: toUnits(result.volume, 8),
          quoteVolume: toUnits(result.quoteVolume, 8),
          firstTradeID: toUnits(result.firstTradeID, 8),
          lastTradeID: toUnits(result.lastTradeID, 8),
          tradeCount: toUnits(result.tradeCount, 8),
          isClosed: result.isClosed,
        };

        console.log("check event from service: ", dataFormat);

        callback(dataFormat);
      }
    });
  },
};
