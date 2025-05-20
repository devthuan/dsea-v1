import Web3 from "web3";

export function toUnits(amount, decimals) {
 const divisor = 10 ** decimals;
 const format1 = (parseInt(amount) / divisor).toFixed(decimals);
 if (!format1.includes(".")) return format1;
 return format1.replace(/\.?0+$/, "");
}
