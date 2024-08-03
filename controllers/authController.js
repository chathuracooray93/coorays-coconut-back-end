const Seller = require('../models/seller');
const Company = require('../models/company');
const bcrypt = require('bcrypt');
const otpService = require('../service/otpService');

exports.login = async(req,res)=>{
    const {username,password} = req.body;

    try{
        let user = await Seller.findOne({username});
        let userType = 'seller';

        if(!user){
            user = await Company.findOne({username});
            userType = 'company';
        }

        if(!(await bcrypt.compare(password, user.password))){
            // return res.send({message: 'wp',userType, user: user});
            return res.status(400).send({message:'wp', userType, pw:user});
        }

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).send('Invalid username or password');
        }

        res.send({message: 'Login Successful', userType, userId: user.id});
    }catch(err){
        res.status(500).send(err);
    }
};

exports.findUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        let user = await Seller.findOne({ username });
        let userType = 'seller';

        if (!user) {
            user = await Company.findOne({ username });
            userType = 'company';
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({ user, userType });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.requestPasswordReset = async (req, res)=>{
    const {phoneNumber} = req.body;

    try{
        const otp = otpService.generateOtp();
    }catch(err){
        console.log(err);
    }
}