const express = require('express');
const cors = require('cors');
const loginRouter = express.Router();
const userController = require('../../controllers/user/login');
const db = require('../../db');

loginRouter.use(cors());

loginRouter.post('/users/login', (req, res) => {
  userController.login(req, res);
});

loginRouter.get('/users/details', (req, res) => {
  db.query('select * from users')
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching users');
    });
});

module.exports = loginRouter;
