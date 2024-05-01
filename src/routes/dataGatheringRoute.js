const express = require('express');
const router = express.Router();
const DataGatheringController = require('../controllers/dataGatheringController');

// post request to insert data
router.post('/insert', (req, res) => {
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

// put request to update data
router.put('/update', (req, res) => {
    try {
        if (validateFields(req.body) && validateDataObject(req.body)) {  // if project_id, fingerprint and table_id parameters are available, update data
            if (validateSearchFields(req.body)) {
                DataGatheringController.updateData(req, res);
            } else {
                res.status(400).json({ error: 'Bad Request | CHECK search_field, search_value | Request validation unsuccessful' });
            }
        } else {  // If project_id, fingerprint and table_id parameters are not available, send bad request
            res.status(400).json({ error: 'Bad Request | CHECK project_id, fingerprint, table, data | id and device fields are automatically added | Request validation unsuccessful' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Failed to update data' });
    }
});

// delete request to delete data
router.delete('/delete', (req, res) => {
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

/*
    * Update state of a toggle
    * API Endpoint : <root>/api/data/feed/update/toggle
    * Request Body : {
    *   widget_id: <widget_id>,
    *   new_value: <new_value>
    * }
    * Validate the request body
    * Call the updateToggleState function in DataGatheringController
*/
router.put('/update/toggle', (req, res) => {
    const { widget_id, new_value } = req.body;

    try {
        if (widget_id && new_value != null) {
            DataGatheringController.updateToggleState(req, res);
        } else {
            res.status(400).json({ error: 'Bad Request : widget_id or new_value is null' });
        }

    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Failed to update data' });
    }
});


const validateFields = (fields) => {
    const { project_id, fingerprint, table } = fields;

    if (!project_id || !fingerprint || !table) {
        return false;
    }

    if (fingerprint.trim() == '' || table.trim() == '') {
        return false;
    }

    if (isNaN(project_id)) {
        return false;
    }

    if (fingerprint.length != 32) {
        return false;
    }

    return true;
}

const validateDataObject = (fields) => {
    const { data } = fields;

    if (!data) {
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
        return false;
    }

    if (search_field.trim() == '' || search_value.trim() == '') {
        return false;
    }

    return true;
}

module.exports = router;
