const express = require("express");
const router = express.Router();

// different model routers
router.use('/sauces', require('./sauces'));

router.use('/items', require('./items')); // Alex - items endpoint

router.use('/users', require('./users')); //MichaelH - Mounting users endpoint

router.use('/orders', require('./orders')); //MichaelH - Mounting orders endpoint

module.exports = router;
