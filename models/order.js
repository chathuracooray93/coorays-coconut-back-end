const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buying_price: Number,
  buying_quantity: Number,
  company:{
    type: mongoose.Types.ObjectId,
    ref: 'Company'
  }
});

module.exports = mongoose.model('Order', orderSchema);