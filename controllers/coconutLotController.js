const CoconutLot = require('../models/coconutLot');
const Seller = require('../models/seller');
const path = require('path');
const multer = require('multer');
const coconutLot = require('../models/coconutLot');


exports.createCoconutLot = async (req, res)=>{
    // try{
    //     const filePaths = req.files.map(file=>file.path);
    //     const coconutLotData = req.body;

    //     const coconutLot = new CoconutLot({
    //         width: req.body.width,
    //         size: req.body.size,
    //         husk_state: req.body.husk_state,
    //         moisture_state: req.body.moisture_state,
    //         inside_state: req.body.inside_state,
    //         lot_image: req.body.lot_image,
    //         type_1:req.body.type_1,
    //         type_2:req.body.type_2,
    //         type_3:req.body.type_3,
    //         wet_coconut:req.body.wet_coconut,
    //         dry_coconut:req.body.dry_coconut,
    //         inside_image: req.body.inside_image,
    //         quantity: req.body.quantity,
    //         seller: req.body.seller
    //     });

    //     await coconutLot.save();
    //     res.send(coconutLot);
    // }catch(err){
    //     res.status(500).send(err);
    // }
    try{
        const files = req.files;
        const coconutLotData = req.body;

        const uploadPath = path.join(__dirname, '../client/public/assets');

        const filePaths = {
            lot_image: '',
            type_1: '',
            type_2: '',
            type_3: '',
            wet_coconut: '',
            dry_coconut: '',
            inside_image: ''
        };

        files.forEach(file => {
            const fieldName = file.fieldname;
            if (filePaths.hasOwnProperty(fieldName)) {
                filePaths[fieldName] = `assets/${file.filename}`;
            }
        });

        coconutLotData.lot_image = filePaths.lot_image;
        coconutLotData.type_1 = filePaths.type_1;
        coconutLotData.type_2 = filePaths.type_2;
        coconutLotData.type_3 = filePaths.type_3;
        coconutLotData.wet_coconut = filePaths.wet_coconut;
        coconutLotData.dry_coconut = filePaths.dry_coconut;
        coconutLotData.inside_image = filePaths.inside_image;

        const lot = new coconutLot(coconutLotData);
        await lot.save();
        res.status(201).json(lot);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.getCoconutLots = async(req, res)=>{
    try{
        const coconutLots = await CoconutLot.find({}).populate('seller');
        res.send(coconutLots);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.findCoconutLot = async(req, res)=>{
    try{
        const coconutLot = await CoconutLot.findById(req.params.id).populate('seller');
        if(!coconutLot){
            return res.status(404).send('Coconut Lot not found');
        }

        res.send(coconutLot);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.deleteCoconutLot = async(req, res)=>{
    try{
        const coconutLot = await CoconutLot.findByIdAndDelete(req.params.id);
        if(!coconutLot){
            return res.status(404).send('Coconut Lot not found');
        }
        res.send(coconutLot);
    }catch(err){
        res.status(500).send(err);
    }
}

exports.updateCoconut = async(req, res)=>{
    try{
       const coconutLot = await CoconutLot.findByIdAndUpdate(req.params.id, req.body, {new:true}).populate('seller');

       if(!coconutLot){
        return res.status(404).send('Coconut Lot not found');
       }
       res.send(coconutLot);
    }catch(err){
        res.status(500).send(err);
    }
};

exports.getCoconutLotsOfSeller = async(req, res)=>{
    try{
        const coconutLots = await CoconutLot.find({seller: req.params.sellerId}).populate('seller');
        res.send(coconutLots);
    }catch(err){
        res.status(500).send(err);
    }
}