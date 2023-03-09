const express = require('express');
const deleteUserRouter = express.Router();
const userController = require('../../controllers/user/login');
const { verifyToken } = require('../../utils/autohrization/jwt');

deleteUserRouter.post('/deleteUser', verifyToken, (req, res) => {
  // userController.login(req,res);
});

module.exports = deleteUserRouter