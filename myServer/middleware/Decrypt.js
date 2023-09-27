const crypto = require('crypto');
// 密碼解密
function Decrypt(decrypt){
    const algorithm = 'aes-256-cbc';
    // const key = crypto.randomBytes(32);
    // const iv = crypto.randomBytes(16);
    const key = "10101010101010101010101010101010"
    const iv = "qqqqqqqqqqqqqqqq"
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(decrypt,'hex','utf8');
    decrypted += decipher.final('utf8');
    return decrypted
}
module.exports = Decrypt ;