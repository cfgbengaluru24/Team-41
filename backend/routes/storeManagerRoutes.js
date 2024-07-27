const express = require('express');
const router = express.Router();

const {registerStoreManager,loginStoreManager,updateClothStatus} = require('../controllers/storeManagerController');

router.route('/register').post(registerStoreManager);
router.route('/login').post(loginStoreManager);
router.route('/updateClothStatus').patch(updateClothStatus);

module.exports = router;