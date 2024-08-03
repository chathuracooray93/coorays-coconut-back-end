const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../client/public/assets'));
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

router.post('/', upload.single('image'), companyController.createCompany);
router.get('/', companyController.getCompanies);
router.put('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);
router.post('/update-password', companyController.updatePassword);

module.exports = router;