const express= require("express");


const postController=require("../controllers/postController");
const {userAuth} = require("../middlewares/auth");
const postRouter= express.Router();

postRouter.post("/posts", userAuth , postController.createPost);
postRouter.patch('/posts/:postId', userAuth, postController.updatePost);
postRouter.delete("/posts/:postId",userAuth, postController.deletePost);

postRouter.post("/posts/:postId/comments",userAuth,postController.addComment);
module.exports =postRouter;