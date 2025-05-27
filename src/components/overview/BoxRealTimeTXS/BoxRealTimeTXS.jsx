import { images } from "../../../assets";

const data = [
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowDownIcon,
  },
  {
    time: "1m ago",
    from: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    to: "vhren674ghjbydfbhf849if84nf4nfb3r767",
    value: "478,865",
    token: "BTC",
    USD: "$342,85K",
    icon: images.arrowUpIcon,
  },
];

const coloums = ["Time", "From", "To", "Value", "Token", "USD"];

const BoxRealTimeTXS = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-white rounded-[32px] p-[24px] flex flex-col gap-y-[16px]">
        <div className="w-full h-full">
          <h1 className="mb-[26px] justify-start text-black text-2xl font-semibold font-['Inter']">
            Real-time TXS
          </h1>
          <table className="w-full h-auto border-none">
            <thead>
              <tr className="border-b-[1px] border-black">
                {coloums?.map((col, index) => {
                  return (
                    <th key={index} className="p-2 text-left">
                      {col}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((coin, index) => (
                <tr key={index}>
                  <td className="p-2 text-[#4E4E4E]">{coin.time}</td>
                  <td className="p-2 text-[#4E4E4E] ">{coin.from}</td>
                  <td className="p-2 text-[#4E4E4E]">{coin.to}</td>
                  <td className="p-2 text-[#4E4E4E]  gap-2">{coin.value}</td>
                  <td className="p-2 text-[#4E4E4E] flex gap-2   items-center h-full">
                    <div className="w-[24px] h-[24px] bg-black/20 rounded-lg"></div>

                    {coin.token}
                  </td>
                  <td className="p-2 text-[#4E4E4E]">{coin.USD}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoxRealTimeTXS;
