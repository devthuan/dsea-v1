

export function calculateTimeKey(interval, timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');

    switch (interval) {
        case '1s':
            return `${hour}_${day}_${month}_${year}`; // TH1
        case '1m':
        case '3m':
            return `${day}_${month}_${year}`; // TH2
        case '5m':
        case '15m':
        case '30m':
            return `${month}_${year}`; // TH3
        case '1h':
        case '2h':
        case '4h':
        case '6h':
        case '8h':
        case '12h':
        case '1d':
        case '3d':
            return `${year}`; // TH4
        case '1w':
        case '1Mo':
            return ''; // TH5
        default:
            return '';
    }
}


// async function getCandles(symbol, interval, startTime, endTime) {
//     const timeKey = calculateTimeKey(interval, startTime);
//     const proxyAddress = await fetchDataSmartContract(
//         candleStrick["MasterFactory"],
//         "getCandleContract",
//         symbol,
//         interval,
//         timeKey
//     );
//     const contractData = {
//         address: proxyAddress,
//         abi: candleStrick["CandleStorageLogic"].abi,
//     };
//     const candles = await fetchDataSmartContract(
//         contractData,
//         "getCandlesByArrayTime",
//         endTime,
//         startTime
//     );
//     return candles.map(item => ({
//         time: Number(item.openTime) / 1000,
//         openTime: Number(item.openTime),
//         closeTime: Number(item.closeTime),
//         open: Number(toUnits(item.open, 8)),
//         high: Number(toUnits(item.high, 8)),
//         low: Number(toUnits(item.low, 8)),
//         close: Number(toUnits(item.close, 8)),
//         volume: Number(toUnits(item.volume, 8)),
//         quoteVolume: Number(toUnits(item.quoteVolume, 8)),
//         firstTradeID: Number(toUnits(item.firstTradeID, 8)),
//         lastTradeID: Number(toUnits(item.lastTradeID, 8)),
//         tradeCount: Number(toUnits(item.tradeCount, 8)),
//         isClosed: item.isClosed,
//     }));
// }