import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());

import user from './routes/users.routes.js'
import pizza from './routes/pizza.routes.js'
import order from './routes/order.routes.js'
app.use('/api/v1/users', user)
app.use('/api/v1/pizza', pizza)
app.use('/api/v1/orders', order)
export default app;