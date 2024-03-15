import jwt from 'jsonwebtoken'

const generateToken_setCookie = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn : '10d'
    })

    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true,  // to prevent XSS attack cross_ site scripting attack
        sameSite: "strict", // to prevent CSRF attack cross site request forgery attacks
        secure : process.env.NODE_ENV !== "development"
    });
};

export default generateToken_setCookie;