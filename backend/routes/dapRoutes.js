const express = require('express');
const router = express.Router();
const dapController = require('../controllers/dapController');

router.post('/create', dapController.createDap);
router.get('/all', dapController.getAllDaps);
router.get('/:id', dapController.getDapById);
router.put('/:id', dapController.updateDap);
router.delete('/:id', dapController.deleteDap);

module.exports = router;
