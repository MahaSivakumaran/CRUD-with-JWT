const { errorHandler } = require('../middleware/errorHandler');
const Employee = require('../model.js/employeeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createEmployee = async(req,res,next)=>{

    const{name,email,password,companyId,role} = req.body;
    const hashPassword = await bcrypt.hash(password,7)
    try {
        const createEmployee = new Employee({
            name,email,password : hashPassword,companyId, role
        })
        const existEmail = await Employee.findOne({email:email});
        if(existEmail) return next(errorHandler(400,"given employee email already exist"));
        await createEmployee.save();
        res.status(201).json({
            message : "emplayee created successfully ",
            empEmail: createEmployee.email
        })
    } catch (error) {
        next(error)
    }
}


const login=async(req,res,next)=>{
    const {email, password} = req.body
    const options = {
        expiresIn: '1m' 
      };
    try {
        const existingMail = await Employee.findOne({email});
        if(!existingMail)return next(errorHandler(400,"Email not found so register first"));
        const existingPassword = await bcrypt.compare(password,existingMail.password);
        if(!existingPassword) return next(errorHandler(400,"Invalid password"));

        const token = jwt.sign({role:existingMail.role},"password",options);
        res.cookie('token',token,{
            httpOnly : true
        })
        res.status(200).json("login success")
    } catch (error) {
        next(error.message)
    }
}

const getData = async(req,res,next)=>{
    try {
        
        const employee = await Employee.find().populate('companyId');
        if(!employee) return next(errorHandler(404,"No data found"));
        res.status(200).json({
            message: "data fetched successfully",
            data : employee
        })
        

    } catch (error) {
        next(error.message)
    }
}

module.exports ={
    createEmployee , login  , getData
}