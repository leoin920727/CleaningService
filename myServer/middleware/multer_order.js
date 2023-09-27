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
const uploadFolder = '../cleaning-services/public/images/orderImg';
createFolder(uploadFolder);

// 設定 storage
const storage = multer.diskStorage({
  // 設定檔案存取位置
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  // // 設定檔案命名方式
  filename: function (req, file, cb) {
    const { ornumber, employeeid, donetime } = JSON.parse(req.body.data)
    const imgLength = req.files.length
    const ext = path.extname(file.originalname); //取得副檔名
    // 命名方式:arrayIndex-清潔場次-員工編號-訂單編號_訂單完成數
    const imageName = `/${imgLength}-${donetime+1}-${employeeid}-${ornumber}${ext}`;
    cb(null, imageName);
  },
});

// 設定 Multer
const orderImg = multer({
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

module.exports = orderImg;
