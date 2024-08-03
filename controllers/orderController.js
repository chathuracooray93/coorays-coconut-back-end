const Order = require('../models/order');

exports.createOrder = async(req, res)=>{
    try{
        const order = new Order({
            buying_price: req.body.buying_price,
            buying_quantity: req.body.buying_quantity,
            company: req.body.company
        });

        await order.save();
        res.send(order);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.getOrders = async(req,res)=>{
    try{
        const orders = await Order.find({}).populate('company');
        res.send(orders);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.findOrder = async(req, res)=>{
    try{
        const order = await Order.findById(req.params.id).populate('company');

        if(!order){
            return res.status(404).send('Order not found');
        }

        res.send(order);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.updateOrder = async(req, res)=>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!order){
            return res.status(404).send('Order not found');
        }

        res.send(order);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.deleteOrder = async(req,res)=>{
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).send('Order not found');
        }
        res.send(order);
    }catch(err){
        res.status(500).send(err);
    }
};