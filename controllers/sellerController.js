const Seller = require('../models/seller');
const bcrypt = require('bcrypt');


exports.addSeller = async (req, res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        const seller = new Seller({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone_number: req.body.phone_number
        });

        await seller.save();
        res.send(seller);
    }catch(err){
        res.status(500).send(err);
    };
};

exports.getSellers = async(req,res)=>{
    try{
        const sellers = await Seller.find({});
        res.send(sellers);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.findSeller = async(req, res)=>{
    try{
        const seller = await Seller.findById(req.params.id);
        res.send(seller);
    }catch(err){
        res.status(500).send(err);
    }
}

exports.updateSeller = async(req,res)=>{
    try{
        const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!seller){
            return res.status(404).send('Seller not found');
        }

    res.send(seller);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.updatePassword = async(req,res)=>{
    const {id, newPassword}=req.body;
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const seller = await Seller.findByIdAndUpdate(id, {password:hashedPassword}, {new:true});
        if(!seller){
            return res.status(404).send('Seller not found');
        }

        res.send(seller);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.deleteSeller = async(req,res)=>{
    try{
        const seller =await Seller.findByIdAndDelete(req.params.id);

        if(!seller){
            return res.status(404).send('Seller not found');
        }

        res.send(seller);
    }catch(err){
        res.status(500).send(err);
    }
};



