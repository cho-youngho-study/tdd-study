var express = require('express');
const {
  route
} = require('../app');
const usersCtrl = require('../controller/users')
var router = express.Router();

/* GET home page. */
router.get('/users', usersCtrl.getUsers);

router.get('/users/:id', usersCtrl.getUsersId)

router.delete('/users/:id', usersCtrl.deleteUsers)

router.post('/users', usersCtrl.postUsers)

router.put('/users/:id', usersCtrl.putUsers)

module.exports = router;