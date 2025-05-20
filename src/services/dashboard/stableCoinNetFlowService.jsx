import { fetchDataSmartContract, listenToEventSmartContract } from "../smartContractService";
import dashboardContract from "../../contracts/dashboardContract.json";


export const stableCoinNetFlowServices = {
  fetchData: async (type) => {
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
        dataContract = dashboardContract["stablecoinNetFlowDay"];
        result = await fetchDataSmartContract(
          dataContract,
          "getFlowInRange",
          day30Ago,
          nowTimestamp,
          "BTC",
          "binance"
        );
        break;
      case "week":
        dataContract = dashboardContract["stablecoinNetFlowWeek"];
        result = await fetchDataSmartContract(
          dataContract,
          "getFlowInRange",
          week30Ago,
          nowTimestamp,
          "BTC",
          "binance"
        );
        break;
      case "month":
        dataContract = dashboardContract["stablecoinNetFlowMonth"];
        result = await fetchDataSmartContract(
          dataContract,
          "getFlowInRange",
          month30Ago,
          nowTimestamp,
          "BTC",
          "binance"
        );
        break;
    }

    const formatData = result.map((item) => {
      const timeStamp = Number(item.timestamp);
      return {
        ...item,
        time: new Date(timeStamp * 1000).toLocaleDateString(),
        inflow: parseFloat(item.inflow),
        outflow: parseFloat(item.outflow),
        netflow: parseFloat(item.netflow),
        balance: parseFloat(item.balance),
      };
    });

    return formatData;
  },

  listeningEvent: async ({ type = "day", callback }) => {
    let dataContract;
    switch (type) {
      case "day":
        dataContract = dashboardContract["bitcoinNetFlowDay"];
        break;
      case "week":
        dataContract = dashboardContract["bitcoinNetFlowWeek"];
        break;
      case "month":
        dataContract = dashboardContract["bitcoinNetFlowMonth"];
        break;
    }

    await listenToEventSmartContract(
      dataContract,
      "FlowTotalRecorded",
      (event) => {
        if (event) {
          const result = event.returnValues;
          const timeStamp = Number(result.timestamp);

          const dataFormat = {
            ...result,
            time: new Date(timeStamp * 1000).toLocaleDateString(),
            inflow: parseFloat(result.inflow),
            outflow: parseFloat(result.outflow),
            netflow: parseFloat(result.netflow),
            balance: parseFloat(result.balance),
          };

          callback(dataFormat);
        }
      }
    );
  },
};
