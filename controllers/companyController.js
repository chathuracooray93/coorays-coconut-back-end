const coconutLot = require('../models/coconutLot');
const Order = require('../models/order')
const Company = require('../models/company');
const bcrypt = require('bcrypt');
const path = require('path');

exports.createCompany = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const imageUrl =  req.file?`./assets/${req.file.filename}`:null;

        const company = new Company({
            username: req.body.username,
            password: hashedPassword,
            company_name: req.body.company_name,
            br: req.body.br,
            email: req.body.email,
            address: req.body.address,
            phone_number: req.body.phone_number,
            br_image: imageUrl
        });

        await company.save();
        res.send(company);
    }catch(err){
        res.status(500).send(err);
    };
};

exports.getCompanies = async (req, res)=>{
    try{
        const company = await Company.find({});
        res.send(company);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.updateCompany = async (req, res)=>{
    try{
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!company){
            return res.status(404).send('Company not found');
        }

        res.send(company);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.updatePassword = async(req,res)=>{
    const {id, newPassword}=req.body;
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const company = await Company.findByIdAndUpdate(id, {password:hashedPassword}, {new:true});
        if(!company){
            return res.status(404).send('Company not found');
        }

        res.send(company);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.deleteCompany = async(req, res)=>{
    try{
        const company = await Company.findByIdAndDelete(req.params.id);

        if(!company){
            return res.status(404).send('Company not found');
        }

        await Order.deleteMany({company: req.params.id});
        res.send(company);
    }catch(err){
        res.status(500).send(err);
    }
}