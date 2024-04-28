import express from 'express'
import { addPizza, getAllPizza } from '../controllers/pizza.controller.js'

const router = express.Router()

router.post('/add-pizza', addPizza)
router.get('/get-pizza', getAllPizza)


export default router