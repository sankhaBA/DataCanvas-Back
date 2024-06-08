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
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting all columns:', error);
        res.status(500).json({ message: 'Failed to get columns of table' });
    }
});

router.get('/project/:project_id', (req, res) => {
    const project_id = req.params.project_id;

    try {
        if (project_id) {  // if project_id parameter is available, perform the desired operation
            // Call the appropriate controller method here
            // For example: columnController.getColumnsByProjectId(project_id, res);
            columnController.getColumnsByProjectId(project_id, res);
        } else {  // If project_id parameter is not available, send an error response
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting columns by project:', error);
        res.status(500).json({ message: 'Failed to get columns by project' });
    }
});

router.get('/:clm_id', (req, res) => {
    const clm_id = req.params.clm_id;

    try {
        if (clm_id) {  // if tbl_id parameter is available, send column details related to that tbl_id
            columnController.getColumnById(clm_id, res);
        } else {  // If tbl_id parameter is not available, send all columns
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting column:', error);
        res.status(500).json({ message: 'Failed to get column' });
    }
});

router.post('/', (req, res) => {
    const { clm_name, data_type, tbl_id } = req.body;

    try {
        if (clm_name && clm_name.trim() != '' && data_type && tbl_id) {  // if tbl_id parameter is available, send column details related to that tbl_id
            columnController.addColumn(req, res);
        } else {  // If tbl_id parameter is not available, send all columns
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting column:', error);
        res.status(500).json({ message: 'Failed to get column' });
    }
});


router.put('/', (req, res) => {
    const { clm_id } = req.body;

    try {
        if (clm_id) {  // if clm_id parameter is available, send column details related to that tbl_id
            columnController.updateColumnById(req, res);
        } else {  // If clm_id parameter is not available, send all columns
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting column:', error);
        res.status(500).json({ message: 'Failed to get column' });
    }
});

router.delete('/', (req, res) => {
    const { clm_id } = req.body;

    try {
        if (clm_id) {  // if clm_id parameter is available, send column details related to that tbl_id
            columnController.deleteColumnById(clm_id, res);
        } else {  // If clm_id parameter is not available, send all columns
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting column:', error);
        res.status(500).json({ message: 'Failed to get column' });
    }
});

module.exports = router;