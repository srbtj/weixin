var express = require('express')
var router = express.Router()

router.post('/message', function(res, req, next) {

  console.log(res)
})

module.exports = router
