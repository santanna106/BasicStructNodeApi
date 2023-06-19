import mongoose from "mongoose";
import bycrypt from 'bcryptjs';

const User = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

User.pre('save',async function (next){
    const hashedPassowrd = await bycrypt.hash(this.password,12);
    this.password = hashedPassowrd

    next();
})

export default mongoose.model("User",User);