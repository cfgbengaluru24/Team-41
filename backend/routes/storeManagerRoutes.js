const express = require('express');
const router = express.Router();

const {registerStoreManager,loginStoreManager} = require('../controllers/storeManagerController');

router.route('/register').post(registerStoreManager);
router.route('/login').post(loginStoreManager);

module.exports = router;