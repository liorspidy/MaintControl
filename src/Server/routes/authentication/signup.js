const express = require('express');
const signupRouter = express.Router();
const userController = require('../../controllers/user/authentication/signup');

signupRouter.post('/signup', (req, res) => {
  userController.signup(req,res);
});

module.exports = signupRouter