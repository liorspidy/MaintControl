const jwt = require("jsonwebtoken");
const jwtSecretConfig = require("../../../../../config/JWTAuthoriztionConfig");

generateAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecretConfig.secretKey, (err, token) => {
      if (err) {
        reject(err);
      } else {        
        resolve(token);
      }
    });
  });
}

verifyToken = (req, res, next) => {
  return new Promise((resolve, reject) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (token == null) {
        // return res.sendStatus(401)
        reject(401, "Unauthorized")
      }

      jwt.verify(token, jwtSecretConfig.secretKey, (err, user) => {
        if (err) {
          // return res.sendStatus(403)
          reject(403, "Forbidden")
        }
        req.user = user
        next()
      })
    } catch (error) {
      reject(500, "Internal server error")
    }
  })
}

module.exports = {
  generateAccessToken: generateAccessToken,
  verifyToken: verifyToken
}