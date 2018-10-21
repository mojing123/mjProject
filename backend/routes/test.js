var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/test.controller');


/* new module */
router.post('/addData', dataCtrl.addData);         //增

module.exports = router;
