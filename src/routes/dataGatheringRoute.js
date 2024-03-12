const express = require('express');
const router = express.Router();
const DataGatheringController = require('../controllers/dataGatheringController');

// post request to insert data
router.post('/insert', (req, res) => {
    const { project_id, fingerprint, table } = req.body;

    try {
        if (validateFields(req.body) && validateDataObject(req.body)) {  // if project_id, fingerprint and table_id parameters are available, insert data
            DataGatheringController.insertData(req, res);
        } else {  // If project_id, fingerprint and table_id parameters are not available, send bad request
            res.status(400).json({ error: 'Bad Request | CHECK project_id, fingerprint, table, data | id and device fields are automatically added | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Failed to insert data' });
    }
});

// delete request to delete data
router.delete('/delete', (req, res) => {
    const { project_id, fingerprint, table } = req.body;

    try {
        if (validateFields(req.body)) {  // if project_id, fingerprint and table_id parameters are available, delete data
            if (validateSearchFields(req.body)) { // if search_field and search_value parameters are available, delete data
                DataGatheringController.deleteData(req, res);
            } else {
                res.status(400).json({ error: 'Bad Request | CHECK search_field, search_value | Request validation unsuccessful' });
            }
        } else {  // If project_id, fingerprint and table_id parameters are not available, send bad request
            res.status(400).json({ error: 'sssBad Request | CHECK project_id, fingerprint, table, data | id and device fields are automatically added | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Failed to delete data' });
    }
});

const validateFields = (fields) => {
    const { project_id, fingerprint, table } = fields;

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

    return true;
}

const validateDataObject = (fields) => {
    const { data } = fields;

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

const validateSearchFields = (fields) => {
    const { search_field, search_value } = fields;

    if (!search_field || !search_value) {
        console.log('search_field and search_value are required');
        return false;
    }

    if (search_field.trim() == '' || search_value.trim() == '') {
        console.log('search_field and search_value cannot be empty');
        return false;
    }

    return true;
}

module.exports = router;
