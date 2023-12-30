const User = require('../models/user')
const Profile = require('../models/profile')
const argon2 = require('argon2')


// create user
const newUser = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json({
            error : "Validation Error"
        })
        
        const newUser = await User.create({email, password : await argon2.hash(password)})


        res.status(201).json({
            isSuccess: true,
            user : newUser
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error : "Internal server error"
        })
    }
}


// create profile

const createProfile = async (req, res) => {
    try {
        const {firstname, lastname, sex, userId} = req.body;

        // check if the body params is missing


        const user = await User.findOne({ _id : userId })

        if(!user) return res.status(404).json({
            error : "User not found."
        })


        const newProfile = await Profile.create({
            firstname, 
            lastname,
            sex : sex.toUpperCase(),
            user : userId
        })


        user.profile = newProfile;
        user.save()


        res.status(201).json({
            isSuccess:true,
            profile : newProfile
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : "Internal server error"
        })
    }
}

const listProfiles = async (req, res) => {
    try {

        const profiles = await Profile.find().populate("user", "email")

        res.status(200).json({
            isSuccess:true,
            profiles
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error : "Internal server error"
        })
    }
}


module.exports = {
    newUser,
    createProfile,
    listProfiles
}