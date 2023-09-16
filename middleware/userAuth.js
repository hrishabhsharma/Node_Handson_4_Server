const jwt = require("jsonwebtoken")

const userAuth = (req,res,next)=>{
    const Bearer = req.headers["authorization"]
    const token = Bearer && Bearer.split(" ")[1]
    if(!token){
        return res.status(401).send({msg:"You are Unauthorized"})
    }
    jwt.verify(token,process.env.scretkey,(err)=>{
        if(err){
           return res.status(403).send({msg:"You are Forbidden to access."})
        }
        next()
    })
}

module.exports = userAuth