const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name:String,
    address : String
},{timestamps : true});

module.exports = mongoose.model('company',companySchema);