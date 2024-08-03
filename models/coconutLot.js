const mongoose = require('mongoose');

const coconut_lotSchema = new mongoose.Schema({
    width: Number,
    size: String,
    husk_state: String,
    moisture_state: String,
    inside_state: String,
    lot_image: String,
    type_1:String,
    type_2:String,
    type_3:String,
    wet_coconut:String,
    dry_coconut:String,
    inside_image: String,
    quantity: Number,
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
});

module.exports = mongoose.model('CoconutLot', coconut_lotSchema);