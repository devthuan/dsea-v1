import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
import CandleStrickNhat from "@/contracts/CandleStrickNhat.json";



export const getProxyAddress = async (symbol, interval, timeKey) => {
  let masterFactoryData = CandleStrickNhat["Factory"];
  console.log("contract factory: ", masterFactoryData);
  if (!masterFactoryData || !masterFactoryData.address) {
    throw new Error(
      "Không thể tìm thấy MasterFactory trong candleStrickNhat.json"
    );
  }
  try {
    const proxyAddress = await fetchDataSmartContract(
      masterFactoryData,
      "initCandle",
      symbol,
      interval
    );
    if (!proxyAddress) {
      throw new Error("Không thể lấy địa chỉ proxy từ MasterFactory");
    }
    console.log("check address proxy: ", proxyAddress[proxyAddress.length -1]);
    return proxyAddress[proxyAddress.length - 1];
  } catch (error) {
    console.error("Error fetching proxy address:", error);
    throw error;
  }
};


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

    // const contractData = CandleStrickNhat["Interval"];

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = ddmmyyyy; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    const proxyAddress = await getProxyAddress(symbol, interval, timeKey);
    console.log("check address proxy: ", proxyAddress);
    const contractData = {
      address: proxyAddress,
      abi: CandleStrickNhat["Interval"].abi,
    };

    console.log("check address proxy: ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "fetchCandlesFromManagers",
      400
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

    console.log("check data from service:", result);
    const formattedData = result.map((item) => {
      return {
        time: Number(item.openTime) ,
        openTime: Number(item.openTime) ,
        closeTime: Number(item.closeTime) ,
        open: Number(toUnits(item.openPrice, 16)), // Chuyển chuỗi thành số
        high: Number(toUnits(item.highPrice, 16)),
        low: Number(toUnits(item.lowPrice, 16)),
        close: Number(toUnits(item.closePrice, 16)),
        volume: Number(toUnits(item.volume, 16)),
        quoteVolume: Number(toUnits(item.quoteAssetVolume, 16)),
        firstTradeID: Number(toUnits(item.firstTradeID, 16)),
        lastTradeID: Number(toUnits(item.lastTradeID, 16)),
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

    // const symbol = "BTCUSDT";
    // const interval = "1m";
    // const timeKey = "ddmmyyyy"; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    // const contractData = {
    //   address: proxyAddress,
    //   abi: CandleStrickNhat["Interval"].abi,
    // };
    
    const contractData = CandleStrickNhat["Factory"]


    console.log("check address proxy: ", contractData);

    let result = await fetchDataSmartContract(
      contractData,
      "getAllAddressInRange",
      "BTCUSDT",
      "1m",
      endTime,
      startTime,
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

    // const symbol = "BTCUSDT";
    // const interval = "1m";
    // const timeKey = "ddmmyyyy"; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    // const contractData = {
    //   address: proxyAddress,
    //   abi: CandleStrickNhat["Interval"].abi,
    // };

    const contractData = CandleStrickNhat["Factory"];
    
    console.log("check address proxy: ", contractData);

    // uint64 openTime,
    // uint256 openPrice,
    // uint256 highPrice,
    // uint256 lowPrice,
    // uint256 closePrice,
    // uint256 volume,
    // uint64 closeTime,
    // uint256 quoteAssetVolume,
    // uint32 numberOfTrades,
    // uint256 takerBuyBaseVolume,
    // uint256 takerBuyQuoteVolume,
    // bool isClose

    await listenToEventSmartContract(contractData, "KlineCreated", (event) => {
      if (event) {
        const result = event.returnValues;
        const dataFormat = {
          time: Number(result.openTime),
          openTime: Number(result.openTime),
          closeTime: Number(result.closeTime),
          open: Number(toUnits(result.openPrice, 16)), // Chuyển chuỗi thành số
          high: Number(toUnits(result.highPrice, 16)),
          low: Number(toUnits(result.lowPrice, 16)),
          close: Number(toUnits(result.closePrice, 16)),
          volume: Number(toUnits(result.volume, 16)),
          quoteVolume: Number(toUnits(result.quoteAssetVolume, 16)),
          firstTradeID: Number(toUnits(result.firstTradeID, 16)),
          lastTradeID: Number(toUnits(result.lastTradeID, 16)),
          tradeCount: Number(toUnits(result.numberOfTrades, 8)),
          isClosed: result.isClosed || true,
        };

        console.log("check event from service: ", dataFormat);
        callback(dataFormat);
      }
    });
  },
};
