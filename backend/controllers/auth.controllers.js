import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken_setCookie from "../utils/generateToken.js";
import { response } from "express";

export const signup = async(req, res)=>{
    try {
        const {firstName, lastName, userName, password, confirmPassword, gender}= req.body;

        if (password!= confirmPassword){
            return res.status(400).json({error: "Passwords did not match!"});
        }

        const user  = await User.findOne({userName});

        if (user){
            return res.status(400).json({error: "User already exist!!"});
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;  // using api to generate profile pic based on names

        const newUser = new User({
            firstName,
            lastName,
            userName,
            password: hashedPassword,
            gender,
            profilePic,
        })

        if(newUser){
            // Generating JWT Token
            generateToken_setCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                profilePic: newUser.profilePic,
            });
        }else{
            res.status(400).json({error : "Invalid User Data."});
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error!!"});
    }
}

export const login = async (req, res)=>{
   try {
    const {userName, password} = req.body;
    const user = await User.findOne({userName});
    const isPasswordMatch  = await bcrypt.compare(password, user?.password || ""); // if user is null will return undefined user?.password  

    if(!user || !isPasswordMatch){
        return res.status(400).json({error: "Invalid Login Credentials."});
    }
    
    generateToken_setCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
    });
    
   } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error!!"});
   }
}

export const logout = async (req, res)=>{
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message: "Logout successfully!!"});
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error!!"});
    }
}