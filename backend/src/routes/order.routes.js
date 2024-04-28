import express from 'express'
import { postOrder, getOrder, getParticularOrder, updateOrder, deleteOrder } from '../controllers/orders.controller.js';
import { auth } from '../middlewares/auth.js'
const router = express.Router();

router.post('/', auth, postOrder)
router.get('/',auth, getOrder)
router.get('/:orderId', auth, getParticularOrder)
router.put('/:orderId', auth, updateOrder)
router.delete('/:orderId', auth, deleteOrder)



export default router