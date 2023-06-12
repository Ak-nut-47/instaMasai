const express = require("express")
const { UserModel } = require("../model/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name,
        email,
        gender,
        password,
        age,
        city,
        is_married } = req.body

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).json({ err: err.message })
            } else {
                const existingUser = await UserModel.findOne({ email: email })
                if (existingUser) {
                    res.status(200).json({ msg: "User is already registered, Please Login" }); return
                } else {
                    const user = new UserModel({ name, email, password: hash, gender, age, city, is_married })
                    await user.save()
                    res.status(200).json({ msg: "The new user has been registered", registeredUser: req.body })
                }
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


module.exports = {
    userRouter
}