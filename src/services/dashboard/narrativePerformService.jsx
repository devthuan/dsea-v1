import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import narrativePerform from "@/contracts/dashboard/narrativePerform.json";
import { convertTimestampToDateString } from "@/util/fotmatDate";

export const narrativePerformService = {
  fetchData: async () => {
    const contractData = narrativePerform["narrativePerform"];

    console.log("check address : ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "getTopNarratives24h"
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

    console.log("check data from service:", result);
    console.log("check data from service length:", result.length);
    const dataResult = result.map((item) => item);
    console.log(dataResult);
    const formattedData = dataResult
      ?.map((item) => {
        return {
          percentageChange:
            Number(toUnits(item.displayMetricChangePercentX100, 8)) * 100000,
          percentageDom:
            Number(toUnits(item.displayMetricDominancePercentX10000, 8)) * 1000,
          displayMetricMarketCap: Number(
            toUnits(item.displayMetricMarketCap, 8)
          ),
          label: item.narrativeName,
          icon: item.iconUrl,
        };
      })
      .reverse();

    // formattedData.sort((a, b) => a.time - b.time);
    // formattedData.reverse();
    console.log("Formatted data:", formattedData);
    return formattedData;
  },

  listeningEvent: async ({ type = "day", callback }) => {
    let dataContract = narrativePerform["narrativePerform"];

    await listenToEventSmartContract(
      dataContract,
      "TopNListUpdatedInSystem",
      (event) => {
        console.log(event);
        if (event) {
          const result = event.returnValues;

          console.log("check event: ", event);

          const formattedData = {
            percentageChange:
              Number(toUnits(result.displayMetricChangePercentX100, 8)) *
              100000,
            percentageDom:
              Number(toUnits(result.displayMetricDominancePercentX10000, 8)) *
              1000,
            displayMetricMarketCap: Number(
              toUnits(result.displayMetricMarketCap, 8)
            ),
            label: result.narrativeName,
            icon: result.iconUrl,
          };

          callback(formattedData ? true : false);
        } 
      }
    );
  },
};
