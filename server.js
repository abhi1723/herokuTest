const dotenv= require('dotenv');
const mongoose = require('mongoose');
const app =require('./app');
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE;


mongoose
    .connect(DB,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("DB Connection Successful.")
    })
app.listen(process.env.PORT, () =>{
    console.log(`App running on port ${process.env.PORT}`)
});