const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/users.route")
require("dotenv").config();


const app = (express());
app.use(cors())
app.use(express.json())

app.use("/users", userRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Server is running at port ${process.env.port}`)
        console.log("Connected to the database")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong")
    }
})