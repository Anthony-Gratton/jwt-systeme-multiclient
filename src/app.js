import express from "express";
import database from "./core/database.js";
import limitRoutes from "./routes/limits.route.js"
import accountRoutes from './routes/account.route.js'
import expressRateLimit from 'express-rate-limit';
import expressSlowDown from 'express-slow-down'
import errors from "./core/errors.js";


const app = express();
database();
app.use(express.json())

const limiter = expressRateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: 'Too many requests'
})
app.use(limiter)
app.use('/accounts', accountRoutes)
app.use(limitRoutes)
app.use(errors);

export default app;