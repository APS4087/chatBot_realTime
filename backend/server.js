// importing 
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./DB/connectToMongoDB.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

// main page route
app.get("/",(req, res)=>{
    // root route 
    res.send("TESTING RESTART !!!")
});

/* // sign up route
app.get("/api/auth/signup", (req, res)=> {
    console.log("signup route");
});

// login route
app.get("/api/auth/login", (req, res)=> {
    console.log("Login route");
});

// logout route
app.get("/api/auth/logout", (req, res)=> {
    console.log("Logout route");
}); */

// instead of the above, making code nicer with express 
app.use("/api/auth", authRoutes);

app.listen(PORT, ()=> {

    connectToMongoDB();
    console.log(`Server Running at port ${PORT}`);

});