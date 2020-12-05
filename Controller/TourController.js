const Tour = require('./../Model/TourModel');
exports.getAllTours = async (req,res) => {
    try{
        const tours = await Tour.find();
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: tours
        })
    }
    catch(err){
        res
        .status(400)
        .json({
            status: 'fail',
            message: 'Invalid Data Sent...!!'
        });
    }
};
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
// module.exports = getAllTours;