const express = require('express');
const router = express.Router();

const {registerClothes,loginDonor,registerDonor,getCitiesWithInventories} = require('../controllers/clothDonorController');

router.route('/registerDonor').post(registerDonor);
router.route('/loginDonor').post(loginDonor);
router.route('/registerClothes').post(registerClothes);
router.route('/getInventories').get(getCitiesWithInventories);

module.exports = router;