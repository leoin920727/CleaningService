function getTwoMonDate() {
  // 獲取當前日期
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  // 設置未來日期的上限為兩個月後
  const futureDate = new Date();
  futureDate.setMonth(currentDate.getMonth() + 2);

  // 遍歷日期並列出
  let d;
  const dateRecord = {};

  while (currentDate <= futureDate) {
    d = new Date(currentDate);
    d.setHours(d.getHours() + 8);
    dateRecord[d.toISOString().split("T")[0]] = [0, 1, 2];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRecord;
}

function updateFreeDays(notWorkDays) {
  const freeDays = getTwoMonDate();
  notWorkDays.forEach((elm) => {
    elm.date = elm.date.toISOString().split("T")[0];
    if (freeDays[elm.date]) {
      freeDays[elm.date] = freeDays[elm.date].filter(
        (item) => item != elm.time
      );
    }
  });
  return freeDays;
}

function getFreeDays(freeWeekDays) {
  let d;
  // [7,1,2,3,4,5,6] 0:滿檔 1:有空擋
  const availableDay = [0, 0, 0, 0, 0, 0, 0];
  for (let date in freeWeekDays) {
    d = new Date(date);
    if (freeWeekDays[date].length) {
      availableDay[d.getDay()] = 1;
    }
  }
  // 預設星期日休息
  availableDay[0] = 0;
  return availableDay;
}

function getFreeTime(freeWeekDays, weekDay) {
  const availableTime = [0, 0, 0];
  for (let date in freeWeekDays) {
    d = new Date(date);
    if (d.getDay() == weekDay) {
      freeWeekDays[date].forEach((elm) => {
        availableTime[elm] = 1;
      });
    }
  }
  return availableTime;
}

function getFreeDate(freeWeekDays, weekDay, timespan) {
  const availableDate = [];
  for (let date in freeWeekDays) {
    d = new Date(date);
    if (d.getDay() == weekDay) {
      freeWeekDays[date].forEach((elm) => {
        if (elm == timespan) {
          availableDate.push(date);
        }
      });
    }
  }
  return availableDate;
}

function getRandomOrderId() {
  // 獲取當前日期和時間
  const now = new Date();

  // 從當前日期和時間獲取年、月、日、時
  const year = now.getFullYear().toString().slice(-2); // 只取年份的最後兩位
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份需要補零
  const day = String(now.getDate()).padStart(2, "0");

  // 生成兩位隨機碼
  let randomCode = ``;
  for (let i = 0; i < 4; i++) {
    randomCode += String.fromCharCode(65 + Math.floor(Math.random() * 26));
  }

  // 組合成訂單編號
  return `${year}${month}${day}${randomCode}`;
}

function toDateString(date) {
  // 獲取當前日期和時間
  const newDate = new Date(date);

  // 從當前日期和時間獲取年、月、日、時
  const year = newDate.getFullYear().toString(); // 只取年份的最後兩位
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // 月份需要補零
  const day = String(newDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

module.exports = {
  getTwoMonDate,
  updateFreeDays,
  getFreeDays,
  getFreeTime,
  getFreeDate,
  getRandomOrderId,
  toDateString,
};
