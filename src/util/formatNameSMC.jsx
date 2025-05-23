
// đối tới interval là 1s : symbol + inverval + hours + date + month + year | done
// đối với interval là 1m : symbol + inverval + hours + date + month + year | done
// đối với interval là 3m : symbol + inverval + hours + date + month + year 
// đối với interval là 5m : symbol + inverval + hours + date + month + year
// đối với interval là 15m : symbol + inverval + hours + date + month + year
// đối với interval là 30m : symbol + inverval + hours + date + month + year

// đối với interval là 1h : symbol + inverval + year | done
// đối với interval là 2h : symbol + inverval + year | done
// đối với interval là 4h : symbol + inverval + year |done
// đối với interval là 6h : symbol + inverval + year | done
// đối với interval là 8h : symbol + inverval + year | done
// đối với interval là 12h : symbol + inverval + year | done
// đối với interval là 1d : symbol + inverval + year | done
// đối với interval là 3d : symbol + inverval + year | done

// đối với interval là 1w : symbol + inverval | done
// đối với interval là 1M : symbol + inverval | done

const formatFuncSMC = ({ symbol, interval, hours, date, month, year }) => {
  // Xác định các interval thuộc từng nhóm
  const case1Intervals = ["1s", "1m", "3m", "5m", "15m", "30m"];
  const case2Intervals = ["1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d"];
  const case3Intervals = ["1w", "1M"];

  // Kiểm tra interval thuộc nhóm nào
  if (case1Intervals.includes(interval)) {
    // Xử lý các interval ngắn (1s đến 30m)
    // Đảm bảo các tham số không phải là undefined
    hours = hours !== undefined ? hours : "00";
    date = date !== undefined ? date : "01";
    month = month !== undefined ? month : "01";
    year = year !== undefined ? year : "1970";

    return `${symbol}_${interval}_${hours}_${date}_${month}_${year}`;
  } else if (case2Intervals.includes(interval)) {
    // Xử lý các interval trung bình (1h đến 3d)
    // Đảm bảo year không phải là undefined
    year = year !== undefined ? year : "1970";

    return `${symbol}_${interval}_${year}`;
  } else if (case3Intervals.includes(interval)) {
    // Xử lý các interval dài (1w và 1M)
    return `${symbol}_${interval}`;
  } else {
    // Trường hợp interval không xác định
    throw new Error(`Unknown interval: ${interval}`);
  }
};

function generateTimeRangeNames(symbol, interval, startTime, endTime) {
  // Chuyển đổi startTime và endTime sang đối tượng Date
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  // Lấy năm từ startDate và endDate
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  // Nếu cùng năm, trả về 1 tên
  if (startYear === endYear) {
    return [`${symbol}_${interval}_${startYear}`];
  }

  // Nếu khác năm, trả về 2 tên
  return [
    `${symbol}_${interval}_${startYear}`,
    `${symbol}_${interval}_${endYear}`
  ];
}


function generateNamesForTimeRange({ symbol, interval, startTime, endTime }) {
  // Lấy năm bắt đầu và kết thúc
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  // Xác định các interval thuộc từng nhóm
  const case1Intervals = ["1s", "1m", "3m", "5m", "15m", "30m"];
  const case2Intervals = ["1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d"];
  const case3Intervals = ["1w", "1M"];

  // Xử lý từng loại interval
  if (case1Intervals.includes(interval)) {
    // Interval ngắn - cần chi tiết đến giờ/ngày/tháng
    const hours = startDate.getHours().toString().padStart(2, "0");
    const date = startDate.getDate().toString().padStart(2, "0");
    const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
    const year = startDate.getFullYear();

    return [formatFuncSMC({ symbol, interval, hours, date, month, year })];
  } else if (case2Intervals.includes(interval)) {
    // Interval trung bình - theo năm
    const result = [];
    for (let year = startYear; year <= endYear; year++) {
      result.push(formatFuncSMC({ symbol, interval, year: year.toString() }));
    }
    return result;
  } else if (case3Intervals.includes(interval)) {
    // Interval dài - không phụ thuộc thời gian
    return [formatFuncSMC({ symbol, interval })];
  } else {
    throw new Error(`Unknown interval: ${interval}`);
  }
}

// Ví dụ sử dụng:
const result = generateNamesForTimeRange({
  symbol: "BTC",
  interval: "1h",
  startTime: "1/1/2024",
  endTime: "12/1/2025",
});

console.log(result); // Output: ["BTC_1h_2024", "BTC_1h_2025"]
