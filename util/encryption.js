var crypto = require('crypto');

function getmd5(str, skip) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    if (!skip) {
      return str.substring(0, 8);
    }
    return str
}

exports.md5 = getmd5

exports.des = {
 
  algorithm:{ ecb:'des-ecb',cbc:'des-cbc' },

  encrypt:function(plaintext,userId,iv){
    var key = new Buffer(getmd5(userId));
    var iv = new Buffer(iv ? iv : 0);
    var cipher = crypto.createCipheriv(this.algorithm.ecb, key, iv);
    cipher.setAutoPadding(true) //default true
    var ciph = cipher.update(plaintext, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
  },

  decrypt:function(encrypt_text,userId,iv){
    var key = new Buffer(getmd5(userId));
    var iv = new Buffer(iv ? iv : 0);
    var decipher = crypto.createDecipheriv(this.algorithm.ecb, key, iv);
    decipher.setAutoPadding(true);
    var txt = decipher.update(encrypt_text, 'base64', 'utf8');
    txt += decipher.final('utf8');
    return txt;
  }
};