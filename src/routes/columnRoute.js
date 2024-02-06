const express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');

// Defining routes for columns
router.get('/columns/table/:tbl_id', columnController.getColumnsOfTable);
router.get('/columns/:id', columnController.getColumnById);
router.post('/columns', columnController.createColumn);
router.put('/columns/:id', columnController.updateColumnById);
router.delete('/columns/:id', columnController.deleteColumnById);

module.exports = router;