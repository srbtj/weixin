var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var token = 'weixin';
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;

  // 加密
  //1. 将 token, timestamp, nonce三个参数进行字典排序
  var array = new Array(token, timestamp, nonce);
  array.sort()
  var str = array.toString().replace(/,/g, '');

  // 2. 将三个字段串拼接成一个字段串 并进行 sha1加密
  var sha1Code = crypto.createHash('sha1');
  var code = sha1Code.update(str, 'utf-8').digest('hex');


  // 3. 将加密后的字符串与 signature对比 标识请求来源于微信
  if(code === signature) {
    res.send(echostr);
  } else {
    res.send('error');
  }
})


router.post('/message', function(req, res) {
  console.log('========================================')
  res.writeHead(200, {'Content-Type': 'application/xml'})
  console.log(req.body)
})
module.exports = router;
