const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")

//getting routers 

const userRouter = require("./routes/users")



if (!config.get("key")) throw new Error("Set 'wasp_key' config variable")

const app = express()

app.use(express.json())
app.use(bodyParser({extended:true}))


app.use("/api", userRouter);





const PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log("Listening on port: " + PORT))