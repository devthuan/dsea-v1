export const groupDataByWeekMonth = (data = [], type = "week") => {
  if (type === "week") {
    return groupDataByWeek(data);
  } else if (type === "month") {
    return groupDataByMonth(data);
  } else {
    throw new Error("Invalid group type. Use 'week' or 'month'.");
  }
};

// Nhóm theo tuần (trả về ngày đầu tuần - Thứ Hai)
function groupDataByWeek(data) {
  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.time);
    const weekStart = getMonday(date); // Lấy ngày đầu tuần (Thứ Hai)
    const key = weekStart.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!groupedData[key]) {
      groupedData[key] = { time: key, inflow: 0, outflow: 0, balance: 0 };
    }

    groupedData[key].inflow += item.inflow;
    groupedData[key].outflow += item.outflow;
    groupedData[key].balance = item.balance; // Lấy balance cuối cùng trong tuần
  });

  return Object.values(groupedData);
}

// Nhóm theo tháng
function groupDataByMonth(data) {
  const groupedData = {};

  data.forEach((item) => {
    const date = new Date(item.time);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`; // YYYY-MM

    if (!groupedData[key]) {
      groupedData[key] = { time: key, inflow: 0, outflow: 0, balance: 0 };
    }

    groupedData[key].inflow += item.inflow;
    groupedData[key].outflow += item.outflow;
    groupedData[key].balance = item.balance; // Lấy balance cuối cùng trong tháng
  });

  return Object.values(groupedData);
}

// Hàm lấy ngày đầu tuần (Thứ Hai)
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai, ..., 6 = Thứ Bảy
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Lùi về Thứ Hai
  return new Date(d.setDate(diff));
}

// // Dữ liệu đầu vào
// const initialData = [
//   { time: "2024-01-01", inflow: 2000, outflow: 1000, balance: 1100 },
//   { time: "2024-01-02", inflow: 465, outflow: 961, balance: 269 },
//   { time: "2024-01-03", inflow: 565, outflow: 351, balance: 574 },
//   { time: "2024-01-04", inflow: 380, outflow: 206, balance: 743 },
//   { time: "2024-01-05", inflow: 482, outflow: 136, balance: 642 },
//   { time: "2024-01-06", inflow: 32000, outflow: 28000, balance: 42000 },
//   { time: "2024-01-07", inflow: 34465, outflow: 25961, balance: 40269 },
//   { time: "2024-01-08", inflow: 34465, outflow: 25961, balance: 40269 },
//   { time: "2024-01-09", inflow: 34465, outflow: 25961, balance: 40269 },
//   { time: "2024-01-10", inflow: 34465, outflow: 25961, balance: 40269 },
//   { time: "2024-01-11", inflow: 34465, outflow: 25961, balance: 40269 },
// ];

// // Chạy thử
// console.log("Grouped by Week:", groupData(initialData, "week"));
// console.log("Grouped by Month:", groupData(initialData, "month"));
