var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).json({"message": "Server is running and database is connected!"});
});

module.exports = router;