// 台灣手機驗證
export const validPhone = new RegExp(/^09[0-9]{8}$/)

//台灣電話跟手機認證(不含連字符)
export const validTel = new RegExp(/^(0\d{1,2}\d{6,8}|\(0\d{1,2}\)\d{6,8}|09\d{8})$/)

// 6 ~ 20 字中英文組成
// 開頭英文大寫
// 至少包含 1 個大小寫英文
// 至少包含 1 個數字
export const validAccount = new RegExp(/^[A-Z]{1}(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/)

// 6 ~ 16 字中英文組成
// 至少包含 1 個大寫英文 與 小寫英文
// 至少包含 1 個數字
export const validPassWord = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/)

// 信箱
export const validEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)

// 中文名稱
export const validName = new RegExp(/^[\u4E00-\u9FA5]{2,4}$/)

// 台灣身分證驗證
export const validId = function (id) {

  id = id.trim();//去除空白

  const verification = id.match(/^[A-Z][12]\d{8}$/);//正規驗證基本格式

  if (!verification) {
    return false;
  }
  //   權重設定
  const conver = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

  //拆解輸入值 ex:A123456789 => "10123456789"
  id = String(conver.indexOf(id[0]) + 10) + id.slice(1);

  // 輸入值加總
  let checkSum = 0;
  for (let i = 0; i < id.length; i++) {
    const c = parseInt(id[i]);
    const w = weights[i];
    checkSum += c * w;
  }

  return checkSum % 10 === 0;
};

// 年齡驗證，必須滿 18 歲
export const validAge = function (birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  // 修正age命名時使用const賦予時會變成不可變動
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
};
