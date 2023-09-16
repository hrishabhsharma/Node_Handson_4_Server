const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const hrep = require("./routing/hreprouting")

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use(hrep)

app.listen(process.env.port,()=>{
    console.log("Server is live",process.env.port)
})