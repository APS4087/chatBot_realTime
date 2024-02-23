import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

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

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            profilePic: newUser.profilePic,
        });


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error!!"});
    }
}

export const login = (req, res)=>{
    console.log("login");
}

export const logout = (req, res)=>{
    console.log("logout");
}