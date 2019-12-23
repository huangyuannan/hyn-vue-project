import  CryptoJS from 'crypto-js';
// 加载核心加密库
function encrypt (message, key) {
    var keyHex = CryptoJS.enc.Utf8.parse(key);
     var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return {
        key: keyHex,
        value: encrypted.toString()
    }
}

function decrypt (message, key) {
    var plaintext = CryptoJS.DES.decrypt(message, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return plaintext.toString(CryptoJS.enc.Utf8)
}

var a = encrypt('mssage123', '123');
var b = decrypt(a.value, a.key);


export default {
    encrypt,
    decrypt
}