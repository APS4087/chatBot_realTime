// importing 
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./DB/connectToMongoDB.js";


const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();


// main page route
app.get("/",(req, res)=>{
    // root route 
    res.send("TESTING RESTART !!!")
});


app.use(express.json()); // parse incoming request with json (from req.body)
app.use(cookieParser());
// instead of the above, making code nicer with express 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, ()=> {

    connectToMongoDB();
    console.log(`Server Running at port ${PORT}`);

});