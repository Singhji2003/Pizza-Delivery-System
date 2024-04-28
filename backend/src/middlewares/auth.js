import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import dotenv from 'dotenv'
dotenv.config();
export const auth = asyncHandler(async(req, res, next) => {
    const token = await req.header("AccessToken");
    if (!token) {
        return res.status(401).json(new ApiError(401, "Unauthorized Request"))
    }
    const decodedToken = jwt.verify(token, process.env.Access_Token_Secret)
    
    const user = await User.findById(decodedToken._id).select("-password")

    if (!user) {
        return res.status(401).json(new ApiError(401, "Unauthorized Request"))
    }

    req.user = user;
    next();

})