const express = require('express');
const router = express.Router();

const {registerClothes,loginDonor,registerDonor,getCitiesWithInventories,reRequestCloth} = require('../controllers/clothDonorController');

router.route('/registerDonor').post(registerDonor);
router.route('/loginDonor').post(loginDonor);
router.route('/registerClothes').post(registerClothes);
router.route('/getInventories').get(getCitiesWithInventories);
router.route('/requestCloth').patch(reRequestCloth);

module.exports = router;