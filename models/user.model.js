import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
name:{type:String,required:[true,"USer Name is required"],
    trim:true,
    minLength:2,
    maxLength:50,
},
email:{
    type:String,
    required:[true,"user Email is required"],
    unique:true,
    trim:true,
    lowercase:true,
match:[/\S+@\S+\.\S+/,"Pleas fill a valid email address"],
},
password:{
    type:String,
    required:[true,"User Password is Required"],
    minLength:6,
}
},{timestamps:true});

const User=mongoose.model('User',userSchema)

export default User;