const express = require('express');
const router = express.Router();

const {registerStoreManager} = require('../controllers/storeManagerController');

router.route('/register').post(registerStoreManager);

module.exports = router;