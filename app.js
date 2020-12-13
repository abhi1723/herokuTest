const express = require('express');
const tourRouter = require('./Routes/TourRoutes');
const AppError = require('./Utility/appError');
const globalErrorHandler = require('./Utility/ErrorController');
const UserRouter = require('./Routes/UserRoutes');
const app = express();
app.use(express.json());
// app.use('/api/v1/tours',tourRouter);
app.use('/api/v1',UserRouter);
app.all('*',(req,res,next) =>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404));
})
app.use(globalErrorHandler);
module.exports =app;