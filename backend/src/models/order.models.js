import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    pizzaType:{
        type:String
    },
    quantity:{
        type:Number
    },
    address:{
        tyep:String
    },
    status:{
        type:String
    },
    totalPrice:{
        type:Number
    }
})

export const Order = mongoose.model('Order', orderSchema)