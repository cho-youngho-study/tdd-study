var express = require('express');
var router = express.Router();

const users = [{
    id: 1,
    name: 'hello'
  },
  {
    id: 2,
    name: 'hello2'
  },
  {
    id: 3,
    name: 'hello3'
  }
]

/* GET home page. */
router.get('/users', function (req, res, next) {
  res.json(users);
});

module.exports = router;