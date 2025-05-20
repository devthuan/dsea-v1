import { images } from "../../../assets/index";

const data = [
  {
    id: 1,
    name: "Bitcoin",
    price: "$100,86B",
    change: 3.96,
    netInflow: "+3.96%",
    icon: images.arrowDownIcon,
  },
  {
    id: 2,
    name: "Ethereum",
    price: "$50,42B",
    change: 2.51,
    netInflow: "+2.51%",
    icon: images.arrowUpIcon,
  },
];

const coloums = ["#", "Name", "Price", "24h Change", "Net Inflow"];

const BoxTableTopPerformance = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-white/70 shadow-md rounded-[32px] p-[24px] flex flex-col gap-y-[16px]">
        <div className="w-full h-full">
          <h1 className="mb-[32px] justify-start text-black text-2xl font-normal font-['Poppins'] leading-9">
            Top performance altcoin
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
                {/* <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">24h Change</th>
                <th className="p-2 text-left">Net Inflow</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((coin, index) => (
                <tr key={coin.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex gap-3 items-center h-full">
                    <div className="w-[24px] h-[24px] bg-black/20 rounded-lg"></div>
                    <div>{coin.name}</div>
                  </td>
                  <td className="p-2">{coin.price}</td>
                  <td className="p-2 flex gap-2">
                    <img src={coin.icon} alt="icon" />
                    <span>{coin.change}%</span>
                  </td>
                  <td className="p-2">{coin.netInflow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BoxTableTopPerformance;
