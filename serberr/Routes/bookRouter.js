const express = require('express');
const {Search, Add} = require('../Controller/bookControls');
const router = express.Router();

router.route('/search').get(Search);
router.route('/addBook').post(Add);

module.exports = router;