import jwt from 'jsonwebtoken';

const protectRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error: "Unauthorized - No Token Provided !!"});
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            res.status(401).json({error: "Unauthorized - Invalid Token !!"});
        }

    } catch (error) {
        
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({error: "Internal Server Error!"});
    }
};