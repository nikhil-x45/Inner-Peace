const validator= require("validator");

const validateSignup = (req ) =>{
   const {userName,email,password,Name}= req.body;

   if(!userName || !Name ){
       throw new Error ("please enter the valid details");
   }
   if(!validator.isEmail(email)){
      throw new Error("please enter the valid email!!");
   }
   if(!validator.isStrongPassword(password)){
     throw new Error("please enter strong password!!");
   }
};

const validateLoginData = (req) =>{
    const {email}= req.body;
    if(!validator.isEmail(email)){
       throw new Error("please enter the valid email!!");
    }
 };

 const validateCreatePostData = (data) => {
    let errors = {};

    // Title validation
    if (!data.title) {
      errors.title = "Title is required";
    } else if (typeof data.title !== "string") {
      errors.title = "Title must be a string";
    } else if (data.title.length < 3 || data.title.length > 100) {
      errors.title = "Title must be between 3 and 100 characters";
    }

    // Content validation
    if (!data.content) {
      errors.content = "Content is required";
    } else if (typeof data.content !== "string") {
      errors.content = "Content must be a string";
    } else if (data.content.length < 10) {
      errors.content = "Content must be at least 10 characters long";
    }

    if (data.tags && !Array.isArray(data.tags)) {
        errors.tags = 'Tags must be an array';
      }
    else if(tags.length> 10){
        error.tags='maximum 10 tags are allowed!!';
    }
    return Object.keys(errors).length > 0 ? errors : null;
};

const validatePostUpdate = (data) => {
    const errors = {};
  
    // Validate title if present
    if (data.title !== undefined) {
      if (typeof data.title !== 'string' || data.title.trim().length === 0) {
        errors.title = "Title must be a non-empty string";
      }
    }
    // Validate content if present
    if (data.content !== undefined) {
      if (typeof data.content !== 'string' || data.content.trim().length === 0) {
        errors.content = "Content must be a non-empty string";
      }
    }
    // Validate tags if present
    if (data.tags !== undefined) {
      if (!Array.isArray(data.tags)) {
        errors.tags = "Tags must be an array";
      } else {
        const invalidTags = data.tags.filter(tag => typeof tag !== 'string' || tag.trim().length === 0);
        if (invalidTags.length > 0) {
          errors.tags = "All tags must be non-empty strings";
        }
      }
    }
    // Ensure no unauthorized fields are being updated
    const allowedFields = ['title', 'content', 'tags'];
    const unauthorizedFields = Object.keys(data).filter(field => !allowedFields.includes(field));
    if (unauthorizedFields.length > 0) {
      errors.unauthorizedFields = `Cannot update the following fields: ${unauthorizedFields.join(', ')}`;
    }
  
    return Object.keys(errors).length > 0 ? errors : null;
  };
  
module.exports= {validateSignup,validatePostUpdate}; 