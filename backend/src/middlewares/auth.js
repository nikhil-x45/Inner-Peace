const therapistAuth= (req,res,next)=>{
     
    console.log("therapist auth is getting checked");
    
    const token= "hehe";
    const isTherapistAuthorised= token==="hehe";

    if(!isTherapistAuthorised){
        res.status(401).send("Unauthorised Request!!");
    }else{
        next();
    }

};
module.exports = { therapistAuth };
