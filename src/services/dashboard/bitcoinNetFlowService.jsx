import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import bitcoinNetflow from "@/contracts/dashboard/bitcoinNetflow.json";
import { convertTimestampToDateString } from "@/util/fotmatDate";

const listMetric = [
  { nameFunction: "getFlowsDataPointsBefore", label: "flows" },
  { nameFunction: "getAUMDataPointsBefore", label: "aum" },
  { nameFunction: "getMarketCapDataPointsBefore", label: "marketcap" },
  { nameFunction: "getVolumeDataPointsBefore", label: "volume" },
];

export const bitcoinNetFlowServices = {
  fetchData: async ({ type, period }) => {
    let now = new Date();
    const startTime = now.getTime();

    const contractData = bitcoinNetflow["bitcoinNetFlow"];

    console.log("check address : ", contractData);
    const currentMetric = listMetric.find(
      (p) => p.label === type.toLowerCase()
    );
    let result = await fetchDataSmartContract(
      contractData,
      currentMetric.nameFunction,
      startTime,
      100
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

    console.log("check data from service:", result);
    console.log("check data from service length:", result.length);
    const formattedData = result
      .map((item) => {
        const formatDate = convertTimestampToDateString(Number(item.timestamp));
        return {
          time: formatDate,
          inFlow: Number(item.inflowUSD),
          outFlow: Number(item.outflowUSD),
          btcPriceUSD: Number(toUnits(item.btcPriceUSD, 8)) * 10000, // Chuyển chuỗi thành số
          aumUSD: Number(toUnits(item.aumUSD, 8)) * 10000, // Chuyển chuỗi thành số
          marketCapUSD: Number(toUnits(item.marketCapUSD, 8)) * 10000, // Chuyển chuỗi thành số
          volumeUSD: Number(toUnits(item.volumeUSD, 8)) * 10000, // Chuyển chuỗi thành số
          netFlow: Number(toUnits(item.netAssetsUSD, 8)),
        };
      })
      .reverse();

    // formattedData.sort((a, b) => a.time - b.time);
    // formattedData.reverse();
    console.log("Formatted data:", formattedData);
    return formattedData;
  },

  listeningEvent: async ({ type = "day", callback }) => {
    let dataContract = bitcoinNetflow["bitcoinNetFlow"];

    await listenToEventSmartContract(
      dataContract,
      "GlobalDataPointRecorded",
      (event) => {
        console.log(event);
        if (event) {
          const result = event.returnValues;
          const timeStamp = Number(result.timestamp);

          console.log("check event: ", event);
          const formatDate = convertTimestampToDateString(
            Number(result.timestamp)
          );
          const formattedData = {
            time: formatDate,
            inFlow: Number(result.inflowUSD),
            outFlow: Number(result.outflowUSD),
            btcPriceUSD: Number(toUnits(result.btcPriceUSD, 8)) * 10000, // Chuyển chuỗi thành số
            aumUSD: Number(toUnits(result.aumUSD, 8)) * 10000, // Chuyển chuỗi thành số
            marketCapUSD: Number(toUnits(result.marketCapUSD, 8)) * 10000, // Chuyển chuỗi thành số
            volumeUSD: Number(toUnits(result.volumeUSD, 8)) * 10000, // Chuyển chuỗi thành số
            netFlow: Number(toUnits(result.netAssetsUSD, 8)),
          };

          callback(formattedData);
        }
      }
    );
  },
};
