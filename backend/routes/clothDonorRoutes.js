const express = require('express');
const router = express.Router();

const {registerClothes,loginDonor,registerDonor} = require('../controllers/clothDonorController');

router.route('/registerDonor').post(registerDonor);
router.route('/loginDonor').post(loginDonor);

module.exports = router;