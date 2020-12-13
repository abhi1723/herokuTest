const Tour = require('./../Model/TourModel');
const catchAsync = require('./../Utility/CatchAsync');
const appError = require('./../Utility/appError');
const CatchAsync = require('./../Utility/CatchAsync');
exports.getAllTours = catchAsync(async(req,res,next) => {
    const tours = await Tour.find();
    if(tours.length==0){
       return next(new appError('No tour found',404)); 
    }
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: tours
        })
   
});
exports.createTour = async (req,res) =>{
    try {
        const newTour = await Tour.create(req.body);
        res
            .status(201)
            .json({
                status : 'Success',
                data: newTour
            });
    }
    catch(err){
        res
            .status(400)
            .json({
                status: 'fail',
                message: 'Invalid Data Sent...!!'
            });  
    }
}
exports.getTour=CatchAsync(async(req,res,next) =>{
    const tour = await Tour.findById(req.params.id);
    if(!tour){
        return next(new appError(`Tour not found with the id ${req.params.id}`,404));
    }
    res.status(200).json({
        status: 'success',
        data : tour
    })
})
// module.exports = getAllTours;