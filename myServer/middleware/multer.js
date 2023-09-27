const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 設定上傳檔案資料夾
const createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
const uploadFolder = '../cleaning-services/public/images/uploads';
createFolder(uploadFolder);

// 設定 storage
const storage = multer.diskStorage({
  // 設定檔案存取位置
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  // 設定檔案命名方式
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); //取得副檔名
    const employeeId = `RA${String(
      JSON.parse(req.body.data).empLength + 1
    ).padStart(3, "0")}`; //取得員工編號
    //重新命名 上傳檔案者_時間戳記.副檔名
    // 延伸問題:時間戳記命名格式會不能生成檔案
    // 解決:文字替換掉.replace(/:/g, '-')
    const newFileName = `/${employeeId}-${new Date()
      .toISOString()
      .replace(/:/g, "-")}${ext}`;
    cb(null, newFileName);
  },
});

// 設定 Multer
const upload = multer({
  limit: {
    // 限制上傳檔案的大小為 1MB
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
  storage: storage,
});

module.exports = upload;
