import User from "../models/user.model.js";


export const getUser = async (req, res) => {

    try {

        const logInUserID = req.user._id;
        const allUsers_notCurrent = await User.find({_id: {$ne: logInUserID}}).select("-password");  // find all users except logInUser // doesn't send password with select

        res.status(200).json(allUsers_notCurrent)
    } catch (error) {
        console.error("Error in user Controller: ", error.message);
        res.status(500).json({error: "Internal Server Error !"});
    }
}