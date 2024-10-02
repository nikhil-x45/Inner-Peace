
const Post= require("../models/Post");
const {validatePostdata}= require("../utils/validaton");

exports.createPost= async (req,res)=> {
  try{
    // retrive logged in user from req attached by userAuth
    const loggedInUser = req.user;
    
    // now extract the data from the request body
    const { content, title, isAnonymous, tags } = req.body;

    // need to validate the data
     validatePostdata(req.body);
    
     // if validated, i can create new post document
     const newPost = new Post({
       authorId: loggedInUser._id,
       content,
       title,
       isAnonymous,
       tags,
     });
     
     await newPost.save();

     res.status(201).json({
        message: "Post created successfully",
        postId: newPost._id,
      });

  }
  catch(err){
    res.json({
        message:" Error: "+err.message,
    })

  }
};
