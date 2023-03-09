const express = require('express');
const addUserRouter = express.Router();
const userController = require('../../controllers/user/login');
const { verifyToken } = require('../../utils/autohrization/jwt');

addUserRouter.post('/addUser', verifyToken, (req, res) => {
  console.log('yeahhhhh');
});

module.exports = addUserRouter