const express = require('express');
const router = express.Router();
const DataRetrievalController = require('../controllers/dataRetrievalController');

// Get request to retrieve all data of a table with offset and limit
router.get('/all/', (req, res) => {
    const { tbl_id } = req.query;
    try {
        if (tbl_id) {
            DataRetrievalController.getAllDataOfATable(req, res);
        } else {
            res.status(400).json({ error: 'Bad Request | CHECK table | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
})

//Get request to retrive the record count of a table
router.get('/count/', (req, res) => {
    const { tbl_id } = req.query;
    try {
        if (tbl_id) {
            DataRetrievalController.getCountOfTable(tbl_id, res);
        } else {
            res.status(400).json({ error: 'Bad Request | CHECK table | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
})

module.exports = router;