const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    name:String,
    email: String,
    password : String,
    companyId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref :'company'
    },
    role:{
        type:String,
        enum : ['admin','manager','user'],
        default : 'user'
    }
},{timestamps : true});

module.exports = mongoose.model('employee',employeeSchema);

