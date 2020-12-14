const dotenv= require('dotenv');
const appError = require('./appError');
dotenv.config({path: './config.env'});
const sendErrorDevelopment =(err,res) => {
    console.log("err2",err);
    res.status(err.statusCode).json({
        status : err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}
const sendErrorProduction = (err,res) =>{
    res.status(err.statusCode).json({
        status : err.status,
        message: err.message
    })
}
const handleCastError = (err,res) => {
    return new appError('Invalid IDtress ',400);
}
const handleDuplicateFieldsDB = (err,res) => {
    console.log("reewwss",err);
    let part = err.message.substring(
        err.message.lastIndexOf("{") + 1, 
        err.message.lastIndexOf(":")
    );
    return new appError(`This ${part} already exists. Plz try with a dfferent ${part}`,400);
}
const handleValidationError = (err,res) => {
    console.log("yahhpppp",err);
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input Data. ${errors.join('. ')}`;
    return new appError(message,400);
}
module.exports = (err,req,res,next) =>{
    // console.log("req",req);
    console.log("err",err);
    err.message = err.message || 'Error';
    err.statusCode = err.statusCode || 500;
    let error = {... err};
    error.message = err.message;
    if(err.name === 'CastError') error = handleCastError(error);
    if(error.code === 11000) error=handleDuplicateFieldsDB(error);
    if(err.name ==='ValidationError') error = handleValidationError(err);
    if(process.env.NODE_ENV=='development'){
        sendErrorDevelopment(error,res);
    }
    else if(process.env.NODE_ENV=='production'){
        sendErrorProduction(error,res);
    }
   
}