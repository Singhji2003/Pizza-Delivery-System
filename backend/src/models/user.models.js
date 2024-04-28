import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
    return next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccesToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.Access_Token_Secret,
        {
            expiresIn: process.env.Access_Token_Expirey
        }
    )

}
export const User = mongoose.model('User', userSchema)