const express= require("express");


const postController=require("../controllers/postController");
const {userAuth} = require("../middlewares/auth");
const postRouter= express.Router();

postRouter.post("/posts", userAuth , postController.createPost);


module.exports =postRouter;