
const { errorHandler } = require('../middleware/errorHandler');
const Company = require('../model.js/companyModel');


const createCompany = async(req,res, next)=>{
    const{name,address}= req.body
    try {
        const createCompany = new Company({
            name, address
        })
        const existingCompany = await Company.findOne({name});
        if(existingCompany) return next( errorHandler(400,"given company already exist"))
        await createCompany.save();
        res.status(201).json({
            status : 201,
            message : 'company created successfully'
        })
    } catch (error) {
        next (error.message)
    }
}

module.exports = {
    createCompany
}