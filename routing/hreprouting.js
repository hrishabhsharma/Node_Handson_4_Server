const { login, register, dashboard } = require("../controller/hrepcontroller")
const userAuth = require("../middleware/userAuth")

const hrep = require("express").Router()

hrep.post("/login",login)
hrep.post("/register",register)
hrep.get("/login/dashboard",userAuth,dashboard)

module.exports = hrep