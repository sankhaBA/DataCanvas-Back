const express = require('express');
const router = express.Router();
const columnController = require('../controllers/columnController');

// Defining routes for columns
router.get('/', (req, res) => {
    const tbl_id = req.query.tbl_id;

    try {
        if (tbl_id) {  // if tbl_id parameter is available, send column details related to that tbl_id
            columnController.getAllColumns(tbl_id, res);
        } else {  // If tbl_id parameter is not available, send all columns
            console.log("no tbl_id");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting all columns:', error);
        res.status(500).json({ message: 'Failed to get columns of table' });
    }

});

// router.get('/:id', columnController.getColumnById);
// router.post('/', columnController.createColumn);
// router.put('/:', columnController.updateColumnById);
// router.delete('/:', columnController.deleteColumnById);

module.exports = router;