import Web3 from "web3";

const httpProvider = new Web3.providers.HttpProvider(
  import.meta.env.VITE_HTTP_PROVIDER_URL
);
const wsProvider = new Web3.providers.WebsocketProvider(
  import.meta.env.VITE_WEBSOCKET_PROVIDER_URL
);
if (!httpProvider || !wsProvider) {
  throw new Error("Provider URL không được cấu hình");
}

const web3Http = new Web3(httpProvider);
const web3Ws = new Web3(wsProvider);

// init cache
const contractInstances = new Map();
export const getContractInstance = (nameContractJson, useHttp = false) => {
  if (contractInstances.has(nameContractJson.address)) {
    return contractInstances.get(nameContractJson.address);
  }
  const contractData = nameContractJson;

  if (!contractData) {
    console.error(`Contract ${name} không tồn tại.`);
    return null;
  }

  const { address, abi } = contractData;


  if (!Array.isArray(abi)) {
    console.error(`ABI của contract ${name} không hợp lệ.`);
    return null;
  }

  const instance = new (useHttp ? web3Http : web3Ws).eth.Contract(abi, address);
  contractInstances.set(nameContractJson.address, instance);
  return instance;
};

// Hàm lấy data từ smart contract
export const fetchDataSmartContract = async (
  contractName,
  methodName,
  ...args
) => {
  const contract = getContractInstance(contractName, false);
  if (!contract) {
    console.warn("Contract chưa được khởi tạo.");
    return null;
  }
  try {
    return await contract.methods[methodName](...args).call();
  
  } catch (err) {
    console.error(`Lỗi khi gọi ${methodName}:`, err);
    return null;
  }
};

export const listenToEventSmartContract = async (
  contractName,
  eventName,
  callback
) => {
  const contract = await getContractInstance(contractName);
  if (!contract) {
    console.warn("Contract chưa khởi tạo, không thể lắng nghe sự kiện.");
    return;
  }
  if (!contract.events || !contract.events[eventName]) {
    console.warn(`Sự kiện ${eventName} không tồn tại trong smart contract.`);
    return;
  }

  try {
    const subscription = contract.events[eventName]();


    subscription.on("connected", () => {

      // Chỉ lắng nghe dữ liệu sau khi kết nối thành công
      subscription.on("data", callback);
    });

    subscription.on("error", (error) => {
      console.error("Lỗi sự kiện:", error);
    });
  } catch (error) {
    console.error(`Lỗi khi đăng ký sự kiện ${eventName}:`, error);
  }


};


// multiple
export const listenToMultipleEvents = (contractName, eventNames, callback) => {
  const contract = getContractInstance(contractName);
  if (!contract) {
    console.warn("Contract chưa khởi tạo, không thể lắng nghe sự kiện.");
    return;
  }

  eventNames.forEach((eventName) => {
    if (contract.events[eventName]) {
      contract.events[eventName]()
        .on("data", callback)
        .on("error", (error) =>
          console.error(`Lỗi sự kiện ${eventName}:`, error)
        );
    } else {
      console.warn(`Sự kiện ${eventName} không tồn tại trong smart contract.`);
    }
  });
};

export const fetchMultipleContracts = async (contracts) => {
  try {
    const results = await Promise.all(
      contracts.map(({ name, method, args }) =>
        fetchDataSmartContract(name, method, ...args)
      )
    );
    return results;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ nhiều contract:", error);
    return null;
  }
};

// how to use
// const results = await fetchMultipleContracts([
//   { name: "TokenContract", method: "totalSupply", args: [] },
//   { name: "TokenContract", method: "balanceOf", args: [userAddress] },
// ]);
