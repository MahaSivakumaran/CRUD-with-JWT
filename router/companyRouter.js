const { createCompany } = require('../controller/companyController');



const companyRoute = require('express').Router();

companyRoute.post('/create',createCompany);

module.exports = {
    companyRoute
}