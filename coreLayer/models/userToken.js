var express = require('express');
var router = express.Router();
const modelController = require("../controllers/UserTokenController");

router.post('/create', modelController.create);

router.get('/list', modelController.list);

router.get('/get', modelController.get);

router.post('/update', modelController.update);

router.post('/updateOne', modelController.updateOne);

router.post('/delete', modelController.delete);

router.post('/deleteOne', modelController.deleteOne);

router.get('/count', modelController.count);

router.post('/compareToken', modelController.compareToken);

module.exports = router;