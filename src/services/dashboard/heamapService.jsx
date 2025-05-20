import { fetchDataSmartContract, listenToEventSmartContract } from "../smartContractService";
import dashboardContract from "../../contracts/dashboardContract.json";
import { toUnits } from "@/util/toUnits";


export const heapMapServices = {
  fetchData: async ({type, category}) => {
    let dataContract;
    let result;
    //  create date now timestamp
    let nowDate = new Date();
    let nowTimestamp = Math.floor(nowDate.getTime() / 1000); // convert to seconds
    let day30Ago = nowTimestamp - 30 * 24 * 60 * 60; // 30 days ago in seconds
    let week30Ago = nowTimestamp - 30 * 24 * 60 * 60 * 7;
    let month30Ago = nowTimestamp - 30 * 24 * 60 * 60 * 30;

    switch (type) {
      case "day":
        dataContract = dashboardContract["heapmapDay"];
        result = await fetchDataSmartContract(
          dataContract,
          "getTopGainers",
          nowTimestamp,
          10
        );
        break;
      // case "week":
      //   dataContract = dashboardContract["stablecoinNetFlowWeek"];
      //   result = await fetchDataSmartContract(
      //     dataContract,
      //     "getFlowInRange",
      //     week30Ago,
      //     nowTimestamp,
      //     "BTC",
      //     "binance"
      //   );
      //   break;
      // case "month":
      //   dataContract = dashboardContract["stablecoinNetFlowMonth"];
      //   result = await fetchDataSmartContract(
      //     dataContract,
      //     "getFlowInRange",
      //     month30Ago,
      //     nowTimestamp,
      //     "BTC",
      //     "binance"
      //   );
      //   break;
    }
    const formatData = result?.map((item) => {
      const timeStamp = Number(item.timestamp);
      return {
        ...item,
        time: new Date(timeStamp * 1000).toLocaleDateString(),
        name: item.name,
        price: toUnits(item.price, 8),
        change_percent: toUnits(item.change_percent, 8) / 100,
        change_percent_1000: (toUnits(item.change_percent, 8) / 100) * 1000,
        volume: toUnits(item.volume, 8),
        market_cap: toUnits(item.market_cap, 8),
      };
    });

    return formatData;
  },

  listeningEvent: async ({ type = "day", callback }) => {
    let dataContract;
    switch (type) {
      case "day":
        dataContract = dashboardContract["heapmapDay"];
        break;
      // case "week":
      //   dataContract = dashboardContract["bitcoinNetFlowWeek"];
      //   break;
      // case "month":
      //   dataContract = dashboardContract["bitcoinNetFlowMonth"];
      //   break;
    }

    await listenToEventSmartContract(
      dataContract,
      "MarketDataRecorded",
      (event) => {
        if (event) {
          const result = event.returnValues.marketDataList;
            console.log( "listening: ", result)
          const dataFormat = [];

          result?.forEach((item) => {
            const timeStamp = Number(item.timestamp);
            const data = {
              time: new Date(timeStamp * 1000).toLocaleDateString(),
              name: item.name,
              price: Number(item.price),
              change_percent: Number(item.change_percent) / 1000,
              change_percent_1000: Math.abs(
                (Number(item.change_percent) / 100) * 1000
              ),
              volume: Number(item.volume),
              market_cap: Number(item.market_cap),
            };
            dataFormat.push(data);
          });

          callback(dataFormat);
        }
      }
    );
  },
};
