const CatchAsync = require('../Utility/CatchAsync');
const User = require('./../Model/UserModel');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');
const appError = require('../Utility/appError');
dotenv.config({path: './../config.env'});
const bcrypt= require('bcryptjs');
const app = require('../app');
const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}
exports.signUp = CatchAsync(async(req,res,next) =>{
    console.log("REQ BODY----");
    console.log(req.body);
    console.log("REQ BODY----");
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const token = signToken(newUser._id);
    res.status(201).json({
        status: 'success',
        token: token,
        /*data:{
            user: newUser
        }*/
    });
})
// dev environment me config me jakr production kroge toh woh error sht jayenge...sirf dev env me woh aayega
exports.login = CatchAsync(async(req,res,next) =>{
    console.log("REQ BODY----");
    console.log(req.body);
    console.log("REQ BODY----");

    // Get details of that user
    const {emailOrPhone,password} =req.body;

    // Check if email and password exists
    if(!emailOrPhone || !password){
        return next(new appError("Please provide email and password",404));
    } 
    let user = await User.findOne({email:emailOrPhone}).select('+password');
    if(!user){
        console.log("hero",emailOrPhone);
         user = await User.findOne({phone:emailOrPhone}).select('+password');
    }
    console.log("user : ",user);
    if(!user || !await  user.correctPassword(password,user.password)) {
        return next(new appError("Incorrect username or password", 404));
    }
    const token = signToken(user._id);
    res.status(200).json({
        status : "success",
        name  :user.name,
        phone : user.phone,
        token
    });
})

exports.isValidPhoneOrEmail =CatchAsync(async(req,res,next) => {
    console.log("req",req.params.phoneOrEmail);
    const phoneOrEmail = req.params.phoneOrEmail;
    if(!phoneOrEmail){
        return next(new appError('Plz provide phone or email',404));
    }
    let user = await User.findOne({email: phoneOrEmail});
    if(!user){
        user = await User.findOne({phone: phoneOrEmail});
    }
    if(!user){
        res.status(404).json({
            status : 'fail',
            validPhoneOrEmail : false
        })
    }
    else{
        res.status(200).json({
            status : 'success',
            validPhoneOrEmail : true
        })
    }
}) 