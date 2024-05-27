const jwt = require('jsonwebtoken');
const { errorHandler } = require('./errorHandler');


const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return next(errorHandler(400,"Invalid token so please login"));
    jwt.verify(token,"password",(err,user)=>{
        if(err)return next(errorHandler(400,err));
        if(user.role !== 'admin') return next(errorHandler(400,"admins only allowed"))
        req.user = user;
        next();
    })
}

module.exports={
    verifyToken
}