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
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  res.status(200).json(users.slice(0, limit));
});

module.exports = router;