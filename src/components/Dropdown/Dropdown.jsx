export default function Dropdown({handeSelectChange, data = []}) {
  

  return (
    <div className="relative">
      <select
        className="w-full text-sm  bg-white rounded-lg border pr-6 pl-4   border-gray-300 shadow-sm focus:outline-none  py-2.5 text-gray-700 appearance-none"
        onChange={(e) => handeSelectChange(e)}
        defaultValue=""
      >
        {data?.map((item, index) => {
          return (
            <option key={index} value={item.value} className="">
              {item.label}
            </option>
          );
        })}
      
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
