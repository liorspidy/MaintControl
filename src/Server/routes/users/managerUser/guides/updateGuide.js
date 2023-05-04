const express = require('express')
const updateGuideRouter = express.Router()
const cors = require('cors')
const managerUserController = require('../../../../controllers/users/managerUser/index')
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt')
const {
  authorizeRole
} = require('../../../../utils/autohrization/role')


updateGuideRouter.use(cors())

updateGuideRouter.put('/guides/updateGuide', verifyToken, authorizeRole(['administrator', 'manager']), (req, res) => {
  managerUserController.updateGuide(req, res)
})

module.exports = updateGuideRouter