const crypto = require('crypto');

const otpStore = new Map();
const OTP_EXPIRY_TIME = 15*60*1000;

exports.generateOtp = () =>{
    return crypto.randomBytes(32).toString('hex');
};

exports.saveOtp = (email, otp)=>{
    const expiry = Date.now()+OTP_EXPIRY_TIME;
    otpStore.set(email, {otp, expiry});
};

exports.verifyOtp = (email, otp)=>{
    const otpEntry = otpStore.get(email);
    if(!otpEntry){
        return false;
    }
    if(Date.now()>otpEntry.expiry){
        otpStore.delete(email);
        return false;
    }

    const isValid = otpEntry.otp === otp;
    if(isValid){
        otpStore.delete(email);
    }
    return isValid;
};