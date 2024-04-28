import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { Pizza } from '../models/pizza.models.js'
import { User } from '../models/user.models.js'
import { Order } from '../models/order.models.js'

// For Adding the Order
const postOrder = asyncHandler(async (req, res) => {
    const { pizzaId, quantity, status } = req.body
    const userId = req.user._id
    try {
        const pizza = await Pizza.findById({ _id: pizzaId });
        const pizzaType = pizza.type;
        const totalPrice = pizza.price * quantity;
        const user = await User.findById({ _id: userId })
        const address = user.address

        const order = await Order.create({
            user: userId,
            pizzaType,
            quantity,
            address,
            status,
            totalPrice
        })
        return res.status(200).json(new ApiResponse(200, order, "Ordered Successfully"))
    }
    catch (err) {
        return res.status(400).json(new ApiError(400, "Some Error Occured"))
    }

})

// For Getting all Order
const getOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const order = await Order.find({ user: userId })

    return res.status(200).json(new ApiResponse(200, order, "Success fetched the order"))

})


// For getting a Particular Order
const getParticularOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const order = await Order.findById({ _id: orderId })
    const pizza = await Pizza.findOne({ type: order.pizzaType })
    return res.status(200).json(new ApiResponse(200, pizza, "Success fetched the order"))

})


// For update an Order
const updateOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const { pizzaId, quantity } = req.body
    try {
        const pizza = await Pizza.findById({ _id: pizzaId });
        const pizzaType = pizza.type;
        const totalPrice = pizza.price * quantity;
        const order = await Order.findByIdAndUpdate({ _id: orderId }, {
            $set: {
                pizzaType,
                totalPrice,
                quantity
            }
        }, {
            new: true
        })
        return res.status(200).json(new ApiResponse(200, order, "Success"))
    } catch (error) {
        return res.status(400).json(new ApiError(400, "Some Error Occured"))
    }
})


// For Deleting the Order
const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params
    const order = await Order.findByIdAndDelete({ _id: orderId })
    return res.status(200).json(new ApiResponse(200, order, "Success deleted the Order"))
})

export { postOrder, getOrder, getParticularOrder, updateOrder, deleteOrder }