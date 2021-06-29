const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")
const cors = require("cors")

const URI = "mongodb://localhost:27017/wasp"

mongoose.connect(URI, {useUnifiedTopology: true})

//getting routers 

const  userRouter  = require("./routes/users")
const  postRouter  = require("./routes/posts")



if (!config.get("key")) throw new Error("Set 'wasp_key' config variable")

const app = express()

app.use(express.json())
app.use(bodyParser({extended:true}))
app.use(cors({origin: "*"}))


app.use("/api", userRouter);
app.use("/api", postRouter);





const PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log("Listening on port: " + PORT))