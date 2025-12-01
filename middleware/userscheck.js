const jwt = require("jsonwebtoken")

const userscheking = (req, res, next) => {
    try {
      const bearerToken = req.headers.authorization
        

      if (!bearerToken) {
        return res.status(500).json({
            message : "bearer Token not found "
        })
      }
      const token  = bearerToken.split(" ")

      if (token[0] !== "Bearer") {
        return res.status(500).json({
            message : "bearer Token  is required"
        })
      }

      if (!token[1]) {
        return res.status(500).json({
            message : "token not found"
        })
      }

      const decode = jwt.verify(token[1],process.env.SECRETKY)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = userscheking