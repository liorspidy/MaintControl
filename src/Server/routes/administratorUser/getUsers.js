const express = require('express');
const getUsersRouter = express.Router();
const administratorUserController = require('../../controllers/administratorUser/index');
const {
  verifyToken
} = require('../../utils/autohrization/jwt');
const {
  authorizeRole
} = require('../../utils/autohrization/role');

getUsersRouter.get('/users/getUsers', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.getUsers(req, res)
});

module.exports = getUsersRouter