import { Pizza } from "../models/pizza.models.js"
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const addPizza = asyncHandler(async(req,res)=>{
    const {type, description, price} = req.body
    const pizza =Pizza.create({type, description, price})
    return res.status(200).json(new ApiResponse(200, pizza, "Successfully Added Pizza"))

})

// For Getting ALL Pizza
const getAllPizza = asyncHandler(async(req,res)=>{
    const pizza = await Pizza.find();
    return res.status(200).json(new ApiResponse(200, pizza, "Successfully Fetched Pizza"))
})

export {addPizza, getAllPizza}