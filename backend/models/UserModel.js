const mongoose = require("mongoose");
// title , amount , category , description , date
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  passWord:{
    type:String,
    required:true
  },
  phoneNo:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("User", UserSchema);
