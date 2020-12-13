const dotenv= require('dotenv');
const mongoose = require('mongoose');
const app =require('./app');
dotenv.config({path: './config.env'});
const DB = process.env.DATABASE;
process.on('uncaughtException', err =>{
    console.log('Uncaught EXCEPTION ! Shutting down....!!');
    console.log(err.name,err.message);
    process.exit(1);
})
mongoose
    .connect(DB,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("DB Connection Successful.")
    });
const server = app.listen(process.env.PORT, () =>{
    console.log(`App running on port ${process.env.PORT}`)
});
process.on ('unhandledRejection', err => {
    console.log('Uncaught EXCEPTION ! Shutting down....!!');
    console.log(err.name,err.message);
    server.close(() =>{
        process.exit(1);
    });
    // process.exit(1);
})
