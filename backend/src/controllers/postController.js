
const Post= require("../models/Post");
const {validatePostUpdate}= require("../utils/validaton");

exports.createPost= async (req,res)=> {
  try{
    // retrive logged in user from req attached by userAuth
    const loggedInUser = req.user;
    
    // now extract the data from the request body
    const { content, title, isAnonymous, tags } = req.body;

    // need to validate the data
     //validatePostdata(req.body);
    
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

exports.updatePost= async (req,res) => {
  // we need to check 2 things:
  // if user is authenicated
  // if user is author of the post

  // Get the post ID from the URL parameters
  // Get the update data from the request body
  // Find the post in the database
  // Check if the user is the author
  // Update the post
  // Save the changes
  // Send back a response
   try{
    const loggedInUser = req.user;
    const {postId} = req.params;
    const errors= validatePostUpdate(req.body);
    if(errors){
        return res.status(400).json({ errors });
    }
    const { title, content, tags, visibility } = req.body;

    const post= await Post.findById(postId);
    console.log("post:",post);
    if(!post){
        throw new Error("goli beta masti nahi, post hi nahi hai to kya edit kr rha")
    }
    if(post.authorId.toString()!== loggedInUser._id.toString()){
        throw new Error(" bkl kya kr rha, khud ka post edit kr");
    }

    if(title)post.title=title;
    if(content)post.content=content;
    if(tags)post.tags=tags;
    if(visibility)post.visibility=visibility;

    await post.save();
    
    res.status(201).json({
        message: "Post updated successfully!!",
        post
    })


   }catch(err){
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Internal server error' });
   }
};
