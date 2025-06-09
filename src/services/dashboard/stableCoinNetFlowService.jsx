import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import stableCoinNetflow from "@/contracts/dashboard/stableCoinNetflow.json";
import { convertTimestampToDateString } from "@/util/fotmatDate";

const listMetric = [
  { nameFunction: "getNarrativeFlowDataByDateRange", label: "All" },
  { nameFunction: "getNarrativeFlowDataByDateRange", label: "Memes" },
  { nameFunction: "getNarrativeFlowDataByDateRange", label: "Gamefi" },
  { nameFunction: "getNarrativeFlowDataByDateRange", label: "Depin" },
];

export const stableCoinNetFlowServices = {
  fetchData: async ({ type = "all", period }) => {
    let now = new Date();
    const startTime = now.getTime();
    // get 30 day ago

    // Lấy thời gian 30 ngày trước
    const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = startTime - THIRTY_DAYS_IN_MS;

    console.log("startTime ", startTime);
    console.log("thirtyDaysAgo ", thirtyDaysAgo);

    const contractData = stableCoinNetflow["stableCoinNetflow"];

    console.log("check address : ", contractData);
    const currentMetric = listMetric.find(
      (p) => p.label.toLowerCase() === type.toLowerCase()
    );

    let result = await fetchDataSmartContract(
      contractData,
      currentMetric.nameFunction,
      currentMetric.label.toLowerCase(),
      1747180800,
      1749459439,
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
        const formatDate = convertTimestampToDateString(
          Number(item.lastUpdatedTimestamp)
        );
        return {
          time: formatDate,
          dominancePercentX10000: Number(item.dominancePercentX10000) * 1000,
          inFlow: Number(item.incomingUSD),
          marketCapOrBalanceUSD: Number(toUnits(item.marketCapOrBalanceUSD, 8)),
          balance: Number(toUnits(item.balanceUSD, 8)) * 100000,
          narrativeKey: Number(toUnits(item.narrativeKey, 8)),
          netFlow: Number(toUnits(item.netFlowUSD, 8)),
          outFlow: Number(toUnits(item.outgoingUSD, 8)),
          performanceChangePercentX100: Number(
            toUnits(item.performanceChangePercentX100, 8) * 1000
          ),
        };
      })
      .reverse();

    // formattedData.sort((a, b) => a.time - b.time);
    // formattedData.reverse();
    console.log("Formatted data:", formattedData);
    return formattedData;
  },

  listeningEvent: async ({ type = "day", callback }) => {
    let dataContract = stableCoinNetflow["stableCoinNetflow"];

    await listenToEventSmartContract(
      dataContract,
      "DataUpdatedViaFactory",
      (event) => {
        console.log(event);
        if (event) {
          const result = event.returnValues;
          const timeStamp = Number(result.timestamp);

          console.log("check event: ", event);
          const formatDate = convertTimestampToDateString(
            Number(result.dateTimestamp)
          );

          const formattedData = {
            time: formatDate,
            dominancePercentX10000:
              Number(result.dominancePercentX10000) * 1000,
            inFlow: Number(result.incomingUSD),
            marketCapOrBalanceUSD: Number(
              toUnits(result.marketCapOrBalanceUSD, 8)
            ),
            narrativeKey: Number(toUnits(result.narrativeKey, 8)),
            balance: Number(toUnits(result.balanceUSD, 8)),
            netFlowUSD: Number(toUnits(result.netFlowUSD, 8)),
            outFlow: Number(toUnits(result.outgoingUSD, 8)),
            performanceChangePercentX100: Number(
              toUnits(result.performanceChangePercentX100, 8) * 1000
            ),
          };

          callback(formattedData);
        }
      }
    );
  },
};
