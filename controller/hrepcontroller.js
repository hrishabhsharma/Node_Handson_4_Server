const jwt = require("jsonwebtoken")
const bycrypt = require("bcrypt")
let store = []

const register = (req,res)=>{
    const credential = req.body
    if(credential.name && credential.phone && credential.email && credential.password){
        const match = store.find((i)=>i.email===credential.email)
        if(match){
            return res.send({msg:"This Email is already registered, Please use new Email"})
        }
        const hashpass = bycrypt.hashSync(credential.password,process.env.saltround)
        const token = jwt.sign({Email : credential.email},process.env.scretkey,{expiresIn: "10 days"})
        const temp = {
            name:     credential.name,
            phone:    credential.phone,
            email:    credential.email,
            password: hashpass,
            }
        store.push(temp)
        res.status(200).send({
            msg:"User is registered, Successfully!!",
            token:token,
            user_details:temp
        })
    }
    else{
        return res.send({msg:"User has not registered,please try again"})
    }
}

const login = (req,res)=>{
    const credential = req.body
    if(credential.email && credential.password){
        const match = store.find((i)=>i.email===credential.email)
        if(match){
            const validate = bycrypt.compareSync(credential.password,match.password)
            if(validate){
                const token = jwt.sign({Email : credential.email},process.env.scretkey,{expiresIn: "50s"})
                return res.send({
                           msg: "User has logged in successfully",
                           token:token,
                       })
            }
            else{   return res.send({msg:"Password is Wrong"})    }
        }
        else{   return res.send({msg:"User is not registered"})   }
    }
    else{
        return res.send({msg:"User has not logged in,please try again"})
    }
}

const dashboard = (req,res)=>{
    res.send("This is dashboard router which is accessed for particular token")
}

module.exports = {login,register,dashboard}