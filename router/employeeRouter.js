const { createEmployee, login, getData } = require('../controller/employeeController');
const { verifyToken } = require('../middleware/verifyToken');

const empRouter = require('express').Router();


empRouter.post('/create',createEmployee);
empRouter.post('/login',login);
empRouter.get('/getData',verifyToken ,getData);


module.exports ={empRouter}