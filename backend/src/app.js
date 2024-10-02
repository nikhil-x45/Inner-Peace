const express= require("express");
const connectDB=require("./config/database.js");
const {therapistAuth}= require("./middlewares/auth");
const User=require("./models/User.js");
const bcrypt= require("bcrypt");
const {validateSignup}= require("./utils/validaton.js");
const app= express();
const cookie= require("cookie-parser");
const jwt = require("jsonwebtoken"); 
const {userAuth}= require("./middlewares/auth.js")

// for parsing json and cookies
app.use(express.json());
app.use(cookie());

// require routers
const authRouter= require("./routes/auth.js");
const profileRouter=require("./routes/profile.js");
const postRouter= require("./routes/post.js");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",postRouter);

connectDB()
 .then(()=>{
    console.log("database connection established!!")
    app.listen(3000, ()=>{
        console.log("server up hai aur daur rha");
    });
  })
 .catch(()=>{
    console.log("db connection failed");
 })

