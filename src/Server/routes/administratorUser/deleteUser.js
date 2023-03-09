const express = require('express');
const deleteUserRouter = express.Router();
const { verifyToken } = require('../../utils/autohrization/jwt');

deleteUserRouter.post('/deleteUser', verifyToken, (req, res) => {
  // userController.login(req,res);
});

module.exports = deleteUserRouter