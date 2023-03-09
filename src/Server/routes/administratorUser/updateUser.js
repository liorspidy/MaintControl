const express = require('express');
const updateUserRouter = express.Router();
const userController = require('../../controllers/user/login');
const { verifyToken } = require('../../utils/autohrization/jwt');

updateUserRouter.post('/updateUser', verifyToken, (req, res) => {
  // userController.login(req,res);
});

module.exports = updateUserRouter