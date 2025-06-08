export const truncateAddress = (address) => {
  if (!address) return "";
  if(address.slice(0,2) === "0x"){
    return `${address.slice(0, 2)}...${address.slice(-6)}`;

  }else {
    return address
  }
};
