const jwt = require("jsonwebtoken")

const tokenGn = (payload) =>{
    return jwt.sign(payload,process.env.SECRETKY,{expiresIn : "15m"})
}


module.exports = tokenGn