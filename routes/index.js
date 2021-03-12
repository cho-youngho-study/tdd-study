var express = require('express');
const {
  route
} = require('../app');
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
  } else {
    res.status(200).json(users.slice(0, limit));
  }
});

router.get('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.filter((user) => {
    return user.id === id
  })[0]
  if (Number.isNaN(id)) {
    res.status(400).end();
  } else if (!user) {
    res.status(404).end();
  } else {
    res.status(200).json(user)
  }
})

router.delete('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.filter((user) => {
    return user.id !== id
  })[0];
  if (Number.isNaN(id)) {
    res.status(400).end();
  } else {
    res.status(204).end();
  }
})

router.post('/users', (req, res) => {
  const name = req.body.name;
  const nameConfirm = users.filter(user => {
    return user.name === name
  }).length

  if (!name) {
    return res.status(400).end();
  }
  if (nameConfirm) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = {
    id,
    name
  };
  users.push(user);
  res.status(201).json(user);
})

module.exports = router;