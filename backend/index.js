const express = require("express")
const cors = require("cors")
const dotEnv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require("./Routes/user")
const chatRoute = require("./Routes/chat")
const messageRoute = require("./Routes/message")

const app = express()
dotEnv.config()

app.use(express.json())
app.use(cors({ origin: true }))
app.use("/api/v1/users", userRoute)
app.use("/api/v1/chat", chatRoute)
app.use("/api/v1/messages", messageRoute)

const port = process.env.PORT || 3000
const uri = process.env.ATLAS_URI

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

mongoose.connect(uri).
    then(() => console.log("Mongo connected..."))
    .catch((error) => console.log("Mongodb connection fail: ", error.message))