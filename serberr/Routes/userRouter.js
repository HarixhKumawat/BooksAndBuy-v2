const express = require('express');
const {VerifyUser,RegisterUser, BoughtBooks} = require('../Controller/userControls');
const router = express.Router();

router.route('/verify').post(VerifyUser);
router.route('/register').post(RegisterUser);
router.route('/boughtBooks').post(RegisterUser);

module.exports = router;