const express = require('express');
const router = express.Router();
const DataConfigController = require('../controllers/dataConfigController');

router.get('/type/', (req, res) => { // Get all data types
    try {
        DataConfigController.getAllDataTypes(req, res);
    } catch (error) {
        console.error('Error getting data types:', error);
        res.status(500).json({ error: 'Failed to get data types' });
    }
});

router.get('/constraint/', (req, res) => { // Get all column constraints
    try {
        DataConfigController.getAllConstraints(req, res);
    } catch (error) {
        console.error('Error getting constraints:', error);
        res.status(500).json({ error: 'Failed to get constraints' });
    }
});

router.get('/type/:type_id', (req, res) => { // Get data type using type_id
    const type_id = req.params.type_id;
    try {
        DataConfigController.getDataTypeById(type_id, res);
    } catch (error) {
        console.error('Error getting data type:', error);
        res.status(500).json({ error: 'Failed to get data type' });
    }
});

router.get('/constraint/:constraint_id', (req, res) => { // Get column constraint using constraint_id
    const constraint_id = req.params.constraint_id;
    try {
        DataConfigController.getColumnConstraintById(constraint_id, res);
    } catch (error) {
        console.error('Error getting column constraint:', error);
        res.status(500).json({ error: 'Failed to get column constraint' });
    }
});

module.exports = router;