import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

export const Pizza = mongoose.model("Pizza", pizzaSchema)