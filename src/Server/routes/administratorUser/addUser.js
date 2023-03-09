const express = require('express');
const addUserRouter = express.Router();
const administratorUserController = require('../../controllers/administratorUser/addUser');
const { verifyToken } = require('../../utils/autohrization/jwt');

addUserRouter.post('/addUser', verifyToken, (req, res) => {
  administratorUserController.addUser(req, res)
});

module.exports = addUserRouter