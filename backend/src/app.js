const express= require("express");

const app= express();

app.get("/user",(req,res)=>{
    res.send({
        firstname:"nikhil",
        lastname:"raj"
    })
})

app.post("/user",(req,res)=>{
    console.log("save data to db");
    // write logic to save data to db
    res.send("data saved sucessfully!!");
})

app.delete("/user",(req,res)=>{
    // write logic to take data from db and delete it
    res.send("user deleted successfully!!!");
})


app.listen(3000, ()=>{
    console.log("server up hai aur daur rha");
});