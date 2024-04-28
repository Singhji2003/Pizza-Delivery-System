import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import ApiResponse from '../utils/ApiResponse.js'
import dotenv from 'dotenv'
dotenv.config();


// For generating ACCESS Token
const generateAccessToken = async (userID) => {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccesToken()
    return { accessToken }
}


// For Registring the User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    if (!(name && email && password && address)) {
        return res.status(400).json(new ApiError(400, "All fields are requird"))
    }
    try {
        const alreadyExistedUser = await User.findOne({ email })

        if (alreadyExistedUser) {
            return res.status(400).json(new ApiError(409, "This email is already exists"))

        }

        const user = await User.create({
            name,
            email,
            password,
            address
        })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            return res.status(400).json(new ApiError(500, "Something went wrong"))

        }
        res.status(200).json(
            new ApiResponse(200, '', "User Successfully Registered")
        )
    }
    catch (err) {
        return res.status(400).json(new ApiError(400, "Some Error Occured"))
    }

})



// For LOGIN the User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!(email)) {
        return res.status(400).json(new ApiError(400, "Email is required"))
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json(new ApiError(400, "This User is not exists."))
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json(new ApiError(401, "Verify with correct Password"))
        }

        const { accessToken } = await generateAccessToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password");

        res.status(200).json(new ApiResponse(200, { user: loggedInUser, accessToken }, "Successfully Logged In"))
    } catch (error) {
        return res.status(400).json(new ApiError(400, "Some Error Occured"))
    }


})



export { registerUser, loginUser }