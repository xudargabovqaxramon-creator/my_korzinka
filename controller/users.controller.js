const bcrypt = require("bcryptjs")
const {v4} = require("uuid")
const tokenGn = require("../utils/token-genereter")
const { read_file, write_file } = require("../file-manager/fs")

const register = async (req, res) =>{
    try {
    const {username, email,  password} = req.body

    if (!username || !email || !password) {
      return res.status(400).json({
        message : "username, email, password kiriting"
      })
    }

    const file_d = read_file("users.json");


    const  finded_email = file_d.find((item) =>  item.email ===email)

    if (finded_email) {
        return res.status(404).json({
            message : " email already exists "
        })
    }

    
    const  finded_username = file_d.find((item) =>  item.username ===username)

    if (finded_username) {
        return res.status(404).json({
            message : " username already exists "
        })
    }

    const hash = await bcrypt.hash(password, 12)

    file_d.push({
      id: v4(),
      username,
      email,
      role : "user",
      password: hash
    })
    write_file("users.json", file_d)
    res.status(201).json({
      message : "registered"
    })
    
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}


// ===================================================
const login = async (req, res) =>{
    try {
    const {email,  password} = req.body

    if ( !email || !password) {
      return res.status(400).json({
        message : " email, password kiriting"
      })
    }

    const file_d = read_file("users.json");


    const  finded_user = file_d.find((item) =>  item.email ===email)

    if (!finded_user) {
        return res.status(401).json({
            message : "user not found"
        })
    }


    const decode = await bcrypt.compare(password, finded_user.password)

   if (decode) {
    const payload = {id:finded_user.id, email:finded_user.email, role:finded_user.role}
    const token = tokenGn(payload)

    res.status(200).json({
        message : "succes",
        token
    })
   }else{
    return res.status(401).json({
        message : "wrong password"
    })
   }
    

    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}





module.exports =  {
    register,
     login
}