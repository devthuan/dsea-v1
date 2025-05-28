import { toUnits } from "@/util/toUnits";
import {
  fetchDataSmartContract,
  listenToEventSmartContract,
} from "../smartContractService";
// import candleStrick from "@/contracts/candleStrick.json";
import candleStrick from "@/contracts/candleStrick.json";
import MasterFactory from "@/contracts/MasterFactory.json";
import CandleStrickNhat from "@/contracts/CandleStrickNhat.json";
// Hàm lấy địa chỉ proxy từ MasterFactory
export const getProxyAddress = async (symbol, interval, timeKey) => {
  let masterFactoryData = MasterFactory["MasterFactory"];
  console.log(masterFactoryData)
  if (!masterFactoryData || !masterFactoryData.address) {
    throw new Error("Không thể tìm thấy MasterFactory trong candleStrick.json");
  }
  try {
    const proxyAddress = await fetchDataSmartContract(
      masterFactoryData,
      "getIntervalContractCount",
      symbol,
      interval,
      timeKey
    );
    if (!proxyAddress) {
      throw new Error("Không thể lấy địa chỉ proxy từ MasterFactory");
    }
    console.log("check address proxy: ", proxyAddress)
    return proxyAddress;
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
    const ddmmyyyy = new Date(startTime).toLocaleDateString("en-GB").replace(/\//g, "_"); // dd_mm_yyyy now
    console.log(ddmmyyyy);
    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = "22_05_2025"; // Thay đổi theo ngày bạn muốn lấy dữ liệu
    // const proxyAddress = await getProxyAddress(
    //   symbol,
    //   interval,
    //   timeKey
    // );

    const contractData = CandleStrickNhat["CandleStrick"];

    console.log("check address proxy: ", contractData)

    let result = await fetchDataSmartContract(
      contractData,
      "initCandle",
      "BTCUSDT",
      "1s",
      100
    );

    if (!result) {
      console.error("Không lấy được dữ liệu nến từ smart contract");
      return [];
    }

  //   struct CandleRecord {
  //     uint64 openTime;                  // 0: Kline open time (ms timestamp)
  //     string openPrice;                // 1: Open price
  //     string highPrice;                // 2: High price
  //     string lowPrice;                 // 3: Low price
  //     string closePrice;               // 4: Close price
  //     string volume;                   // 5: Volume
  //     uint64 closeTime;                // 6: Kline close time (ms timestamp)
  //     string quoteAssetVolume;        // 7: Quote asset volume
  //     uint32 numberOfTrades;          // 8: Number of trades
  //     string takerBuyBaseVolume;      // 9: Taker buy base asset volume
  //     string takerBuyQuoteVolume;     // 10: Taker buy quote asset volume
  //     string unused;                  // 11: Unused field (ignore)
  // }

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

  fetchDataOld: async (startTime) => {
    // let now = new Date();
    const endTime = startTime - 10 * 24 * 60 * 60 * 1000;

    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = "22_05_2025";
    const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    const contractData = {
      address: proxyAddress,
      abi: candleStrick["CandleStorageLogic"].abi,
    };

    let result = await fetchDataSmartContract(
      contractData,
      "getCandlesByArrayTime",
      endTime,
      startTime
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
    const symbol = "BTCUSDT";
    const interval = "1m";
    const timeKey = "22_05_2025";
    const proxyAddress = await getProxyAddress(symbol, interval, timeKey);

    const contractData = {
      address: proxyAddress,
      abi: candleStrick["CandleStorageLogic"].abi,
    };

    await listenToEventSmartContract(contractData, "CandleUpdated", (event) => {
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