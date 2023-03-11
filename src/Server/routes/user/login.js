const express = require('express');
const loginRouter = express.Router();
const userController = require('../../controllers/user/login');

loginRouter.post('/users/login', (req, res) => {
  userController.login(req,res);
});

module.exports = loginRouter
