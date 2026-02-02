const mongoose=require("mongoose");
// create todo schema and models
const todoSchema=mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:Boolean,default:false}
  });
  module.exports = mongoose.model("Todo", todoSchema);