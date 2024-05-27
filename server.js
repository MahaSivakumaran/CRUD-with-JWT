const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const { companyRoute } = require('./router/companyRouter');
const { empRouter } = require('./router/employeeRouter');
const{PORT,DB_URL} = process.env

mongoose.connect(DB_URL)
.then(()=>console.log(`data base connected`))
.catch(err=>console.log(err.message))


app.use(express.json());
app.use(cookieParser());

app.use('/api/company',companyRoute)
app.use('/api/employee',empRouter)

app.use((err,req,res,next)=>{
    const message = err.message || 'Internal server error';
    const status = err.status || 500;
    return res.status(status).json({
        status,message
    })
});

app.listen(PORT,()=>console.log(`server connected to the port ${PORT}`))