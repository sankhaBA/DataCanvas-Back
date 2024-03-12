const express = require('express');
const router = express.Router();
const DataGatheringController = require('../controllers/dataGatheringController');

// post request to insert data
router.post('/insert', (req, res) => {
    const { project_id, fingerprint, table } = req.body;

    try {
        if (validateFields(req.body)) {  // if project_id, fingerprint and table_id parameters are available, insert data
            DataGatheringController.insertData(req, res);
        } else {  // If project_id, fingerprint and table_id parameters are not available, send bad request
            res.status(400).json({ error: 'Bad Request | CHECK project_id, fingerprint, table, data | id and device fields are automatically added | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Failed to insert data' });
    }
});

// put request to update data
router.put('/update', (req, res) => {
    const { project_id, fingerprint, table } = req.body;

    try {
        if (validateFields(req.body) && validateDataFields(req.body)) {  // if project_id, fingerprint and table_id parameters are available, update data
            DataGatheringController.updateData(req, res);
        } else {  // If project_id, fingerprint and table_id parameters are not available, send bad request
            res.status(400).json({ error: 'Bad Request | CHECK project_id, fingerprint, table, data | id and device fields are automatically added | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Failed to update data' });
    }
});

const validateFields = (fields) => {
    const { project_id, fingerprint, table, data } = fields;

    if (!project_id || !fingerprint || !table) {
        console.log('project_id, fingerprint and table are required');
        return false;
    }

    if (fingerprint.trim() == '' || table.trim() == '') {
        console.log('project_id, fingerprint and table cannot be empty');
        return false;
    }

    if (isNaN(project_id)) {
        console.log('project_id must be a number');
        return false;
    }

    if (fingerprint.length != 32) {
        console.log('fingerprint must be 32 characters long');
        return false;
    }

    if (!data) {
        console.log('data is required');
        return false;
    }

    // If data section do not have any json fields, return false
    if (Object.keys(data).length == 0) {
        return false;
    }

    // Check if the data section has 'id' or 'device' section. If so, return false
    if (data.id || data.device) {
        return false;
    }

    return true;
}

//validate update fields data
const validateDataFields = (fields) => {
    const { index_column, index_value} = fields;
    if(!index_column|| !index_value){
        console.log('index_column and index_value are required');
        return false;
    }

    return true;
}

module.exports = router;
