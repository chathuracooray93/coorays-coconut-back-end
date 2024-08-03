const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone_number: Number
});

module.exports = mongoose.model('Seller', sellerSchema);