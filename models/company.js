const mongoos = require('mongoose');

const companySchema = new mongoos.Schema({
    username: String,
    password: String,
    company_name: String,
    br: String,
    email: String,
    address: String,
    phone_number: Number,
    br_image: String
});

module.exports = mongoos.model('Company',companySchema);