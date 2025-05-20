export const convertTimestampToDateString = (
  timestamp,
  type = "YYYY-MM-DD"
) => {
  if (!timestamp || typeof timestamp !== "number") {
    throw new Error("Invalid timestamp. It must be a number.");
  }

  const date = new Date(timestamp * 1000); // Chuyển timestamp từ giây sang milliseconds
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  type.toUpperCase();
  switch (type) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD-MM-YYYY":
      return `${day}-${month}-${year}`;
    case "YYYY/MM/DD":
      return `${year}/${month}/${day}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    case "MM-DD-YYYY":
      return `${month}-${day}-${year}`;
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "ISO":
      return date.toISOString(); // Trả về định dạng ISO 8601
    case "FULL":
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    default:
      throw new Error(
        `Invalid type format. Allowed values: "YYYY-MM-DD", "DD-MM-YYYY", "YYYY/MM/DD", "DD/MM/YYYY", "MM-DD-YYYY", "MM/DD/YYYY", "ISO", "FULL"`
      );
  }
};
