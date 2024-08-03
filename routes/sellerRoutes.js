const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');
const company = require('../models/company');

router.post('/', sellerController.addSeller);
router.get('/', sellerController.getSellers);
router.get('/:id', sellerController.findSeller);
router.put('/:id', sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);
router.post('/update-password', sellerController.updatePassword);

module.exports = router;