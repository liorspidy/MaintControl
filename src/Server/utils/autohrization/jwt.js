const jwt = require("jsonwebtoken");
const jwtSecretConfig = require("../../config/JWTAuthoriztionConfig");

generateAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    const options = {
      expiresIn: '1h'
    };

    jwt.sign(payload, jwtSecretConfig.secretKey, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    });
  });
}

verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'Missing authorization header'
    })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, jwtSecretConfig.secretKey, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        error: 'Invalid or expired token'
      })
    }else{}
    req.user = decodedToken
    next()
  });
}

module.exports = {
  generateAccessToken: generateAccessToken,
  verifyToken: verifyToken
}