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

const validatePostdata= (data)=>{

        const { content, title, isAnonymous, tags } = data;
      
        // Check if content exists and isn't empty
        if (!content || content.trim().length === 0) {
          throw new Error("Content is required");
        }
        // Check if content is too long
        const MAX_CONTENT_LENGTH = 10000;
        if (content.length > MAX_CONTENT_LENGTH) {
          throw new Error(`Content exceeds maximum length of ${MAX_CONTENT_LENGTH} characters`);
        }
      
        // Similar checks for title
        if (!title || title.trim().length === 0) {
          throw new Error("Title is required");
        }
      
        const MAX_TITLE_LENGTH = 200;
        if (title.length > MAX_TITLE_LENGTH) {
          throw new Error(`Title exceeds maximum length of ${MAX_TITLE_LENGTH} characters`);
        }
      
        // Check if isAnonymous is a boolean
        if (typeof isAnonymous !== 'boolean') {
          throw new Error("isAnonymous must be a boolean");
        }
      
        // Check tags if they exist
        if (tags) {
          if (!Array.isArray(tags)) {
            throw new Error("Tags must be an array");
          }
          
          const MAX_TAGS = 10;
          if (tags.length > MAX_TAGS) {
            throw new Error(`Number of tags exceeds maximum of ${MAX_TAGS}`);
          }
        }
      };
      

const validateLoginData = (req) =>{
    const {email}= req.body;
    if(!validator.isEmail(email)){
       throw new Error("please enter the valid email!!");
    }
 };

module.exports= {validateSignup,validatePostdata}; 