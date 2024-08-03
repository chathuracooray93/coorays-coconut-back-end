const express = require('express');
const router = express.Router();
const coconutController = require('../controllers/coconutLotController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname,'../client/public/assets'));
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage:storage});

router.post('/',upload.any(), coconutController.createCoconutLot);
router.get('/', coconutController.getCoconutLots);
router.get('/:id', coconutController.findCoconutLot);
router.get('/seller/:sellerId', coconutController.getCoconutLotsOfSeller)
router.put('/:id', coconutController.updateCoconut);
router.delete('/:id', coconutController.deleteCoconutLot);

module.exports = router;