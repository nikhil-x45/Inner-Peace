
exports.view= async(req,res) => {
    // user authenticated and u got the who is logged in user by auth Middleware
     try{
        const user=req.user;
        res.send(user);
     }catch(err){
         res.send("kuch to gadbad hai!!")
     }
};