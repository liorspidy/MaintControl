const express = require('express');
const loginRouter = express.Router();
const userController = require('../../controllers/user/authentication/login');

loginRouter.post('/login', (req, res) => {
  userController.login(req,res);
});

module.exports = loginRouter
