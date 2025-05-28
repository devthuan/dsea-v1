import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import MasterFactory from "@/contracts/candleStrickHoang.json";

export const getProxyAddress = async (symbol, interval, timeKey) => {
  let masterFactoryData = MasterFactory["MasterFactory"];
  console.log(masterFactoryData);
  if (!masterFactoryData || !masterFactoryData.address) {
    throw new Error("Không thể tìm thấy MasterFactory trong candleStrick.json");
  }
  try {
    const proxyAddress = await fetchDataSmartContract(
      masterFactoryData,
      "symbolIntervalContracts",
      symbol,
      interval,
      timeKey
    );

    console.log("check ..... ", proxyAddress);
    if (!proxyAddress) {
      throw new Error("Không thể lấy địa chỉ proxy từ MasterFactory");
    }
    console.log("check address proxy: ", proxyAddress);
    return proxyAddress;
  } catch (error) {
    console.error("Error fetching proxy address:", error);
    throw error;
  }
};

export const candleStrickServiceHoang = {
  fetchData: async () => {
    let now = new Date();
    const startTime = now.getTime();
    const startTimestampMs = Math.floor(startTime / 1000); // Chuyển đổi sang giây
    // chuyển sang phut
    const startTimeInMinutes = Math.floor(startTimestampMs / 60);
    const endTime = now.getTime() - 10 * 24 * 60 * 60 * 1000;
    const ddmmyyyy = new Date(startTime)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "_"); // dd_mm_yyyy now
    console.log(ddmmyyyy);
    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = 0; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    // const contractData = {
    //   address: proxyAddress.contractAddress,
    //   abi: MasterFactory["Interval"].abi,
    // };

    const contractData = MasterFactory["MasterFactory"];

    console.log("check startTime :", startTime);
    console.log("check endTime :", endTime);
    console.log("check timeKey :", timeKey);
    console.log("check symbol :", symbol);
    console.log("check interval :", interval);

    console.log("check address proxy: ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "getKlinesBefore",
      "BTCUSDT",
      "1m",
      startTime,
      100
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

    console.log("check data from service:", result);
    console.log("check data from service length:", result.length);
    const formattedData = result.map((item) => {
      return {
        time: Number(item.timestamp),
        openTime: Number(item.timestamp),
        closeTime: Number(item.endTimestamp),
        open: Number(toUnits(item.open, 8)), // Chuyển chuỗi thành số
        high: Number(toUnits(item.high, 8)),
        low: Number(toUnits(item.low, 8)),
        close: Number(toUnits(item.close, 8)),
        volume: Number(toUnits(item.volume, 8)),
        quoteVolume: Number(toUnits(item.quoteVolume, 8)),
        firstTradeID: Number(toUnits(item.firstTradeID, 8)),
        lastTradeID: Number(toUnits(item.firstTradeId, 8)),
        tradeCount: Number(toUnits(item.numberOfTrades, 8)),
        // tradeCount: 1,
        isClosed: item.isClosed,
      };
    });
    // check opentime trùng nhau
    formattedData.sort((a, b) => a.time - b.time);
    const uniqueData = formattedData.filter((item, index, self) => {
      return index === 0 || item.openTime !== self[index - 1].openTime;
    });
    console.log("Formatted data:", formattedData);
    return uniqueData;
  },

  fetchDataOld: async (startTime) => {
    // let now = new Date();
    const endTime = startTime - 10 * 24 * 60 * 60 * 1000;

    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = 0; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    // const contractData = {
    //   address: proxyAddress.contractAddress,
    //   abi: MasterFactory["Interval"].abi,
    // };

    const contractData = MasterFactory["MasterFactory"];

    console.log("check address proxy: ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "getKlinesBefore",
      "BTCUSDT",
      "1m",
      startTime,
      100
    );

    console.log("get old data from service:", result);

    if (!result) {
      console.error("Không lấy được dữ liệu nến lịch sử từ smart contract");
      return [];
    }

    console.log("check data from service:", result.length);
    const formattedData = result.map((item) => {
      return {
        time: Number(item.timestamp),
        openTime: Number(item.timestamp),
        closeTime: Number(item.endTimestamp),
        open: Number(toUnits(item.open, 8)), // Chuyển chuỗi thành số
        high: Number(toUnits(item.high, 8)),
        low: Number(toUnits(item.low, 8)),
        close: Number(toUnits(item.close, 8)),
        volume: Number(toUnits(item.volume, 8)),
        quoteVolume: Number(toUnits(item.quoteVolume, 8)),
        firstTradeID: Number(toUnits(item.firstTradeID, 8)),
        lastTradeID: Number(toUnits(item.firstTradeId, 8)),
        tradeCount: Number(toUnits(item.numberOfTrades, 8)),
        // tradeCount: 1,
        isClosed: item.isClosed,
      };
    });

    formattedData.sort((a, b) => a.openTime - b.openTime);
    console.log("Formatted historical data:", formattedData);
    return formattedData;
  },

  listeningEvent: async ({ callback }) => {
    // const contractData = MasterFactory["MasterFactory"];

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = 0; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    // const contractData = {
    //   address: proxyAddress,
    //   abi: MasterFactory["Interval"].abi,
    // };
    const contractData = MasterFactory["MasterFactory"];

    console.log("check address interval: ", contractData);

    await listenToEventSmartContract(contractData, "KlineAdded", (event) => {
      if (event) {
        const result = event.returnValues;
        console.log(event.returnValues);
        const dataFormat = {
          time: Number(result.timestamp),
          openTime: Number(result.timestamp),
          closeTime: Number(result.endTimestamp),
          open: Number(toUnits(result.open, 8)), // Chuyển chuỗi thành số
          high: Number(toUnits(result.high, 8)),
          low: Number(toUnits(result.low, 8)),
          close: Number(toUnits(result.close, 8)),
          volume: Number(toUnits(result.volume, 8)),
          quoteVolume: Number(toUnits(result.quoteVolume, 8)),
          firstTradeID: Number(toUnits(result.firstTradeID, 8)),
          lastTradeID: Number(toUnits(result.firstTradeId, 8)),
          tradeCount: Number(toUnits(result.numberOfTrades, 8)),
          // tradeCount: 1,
          isClosed: result.isClosed,
        };

        console.log("check event from service: ", dataFormat);
        callback(dataFormat);
      }
    });
  },
};
