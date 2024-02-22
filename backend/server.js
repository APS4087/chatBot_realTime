const express = require("express")

const app = express();

app.get("/",(req, res)=>{
    // root route 
    res.send("TESTING RESTART !!!")
});

app.listen(5000, ()=> console.log('Server Running at port 5000'));