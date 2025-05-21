import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import candleStrick from "@/contracts/candleStrick.json";

export const candleStrickService = {
  fetchData: async () => {
    let now = new Date();
    let startTime = Math.floor(now.getTime() / 1000); // convert to seconds
    let day30Ago = startTime - 30 * 24 * 60 * 60; // 30 days ago in seconds
    // let startTime = "1716124800000"; // convert to seconds
    // let endTime = "1747934400000"; // 30 days ago in seconds

    let contractData = candleStrick["TestSMC"];

    let result = await fetchDataSmartContract(
      contractData,
      "getCandlesByTime",
      startTime,
      day30Ago
    );
    console.log(result);
  },
  listeningEvent: async (symbol, interval) => {
    const dataContract = candleStrick["TestSMC"];
    const result = await listenToEventSmartContract(
      dataContract,
      "getCandleStrick",
      symbol,
      interval
    );
    return result;
  },
};
