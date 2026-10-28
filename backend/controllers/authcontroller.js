const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const mongoose = require("mongoose")

const Auth = require("../models/authmodel")
const User = require("../models/usermodel")

const signup = async (req, res) => {
    //pfp
    const {username, email, password} = req.body    
    
    if (!username || !email || !password) {
        return res.status(401).json("Fill in the details") 
    }

    const savedemail = await Auth.findOne({email})
    
    if (savedemail) {
        return res.status(401).json("Email exists") 
    }

    const user = new User({
        username,
        pfp: req.file ? req.file.path : '',
    })

    try {
        await user.save()

        const auth = new Auth({
            userid: user._id, 
            email, 
            password
        })
        await auth.save()
        
        return res.status(201).json("User created successfully")
    } catch (err) {
        return res.status(401).json({message:"Error occurred", err: err.message})
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body
    
    if (!email || !password) {
        res.status(401).json("Fill in the details") 
    }

    const authuser = await Auth.findOne({email})

    if (!authuser) {
        return res.status(401).json("Invalid credentialss") 
    }

    const validpassword = await authuser.comparePassword(password)

    if (!validpassword) {
        return res.status(401).json({ message: "Invalid credentials" });
    }    

    try {
        const token = jwt.sign({ id: authuser.userid}, process.env.JWTT, {expiresIn: "1h"});

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 1000
        })

        return res.status(200).json({ message: "Signin Successful", token });
    } catch (err) {
        return res.status(401).json({message:"Error logging in", err: err.message})
    }
}

const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        path: "/"
    });

    res.status(200).json({
        message: "Logged out successfully"
    });
};


module.exports = { signin, signup, logout }