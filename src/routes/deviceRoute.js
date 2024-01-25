const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/deviceController');

// GET request for /api/device or /api/device?project_name=sample_project_name
router.get('/', (req, res) => {
    const project_id = req.query.project_id;

    try {
        if (project_id) {  // if project_id parameter is available
            DeviceController.getDevicesByProjectId(project_id, res);
        } else {  // If project_id parameter is not available
            console.log("no project_id");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting devices:', error);
        res.status(500).json({ error: 'Failed to get devices' });
    }

});

// GET request for /api/device/:deviceId
router.get('/:deviceId', (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        if (deviceId) {  // if deviceId parameter is available
            DeviceController.getDeviceById(deviceId, res);
        } else {  // If deviceId parameter is not available
            console.log("no deviceId");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting devices:', error);
        res.status(500).json({ error: 'Failed to get devices' });
    }

});

// GET request for /api/device/:deviceFinerprint
router.get('/fingerprint/:deviceFingerprint', (req, res) => {
    const deviceFingerprint = req.params.deviceFingerprint;

    try {
        if (deviceFingerprint) {  // if deviceFingerprint parameter is available
            DeviceController.getDeviceByFingerprint(deviceFingerprint, res);
        } else {  // If deviceFingerprint parameter is not available
            console.log("no deviceFingerprint");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error getting devices:', error);
        res.status(500).json({ error: 'Failed to get devices' });
    }

});



// POST request for /api/device, and create a new device
router.post('/', (req, res) => {
    try {
        if (!req.body.device_name || !req.body.project_id) {
            res.status(400).json({ message: 'Bad Request' });
        } else {
            DeviceController.addDevice(req, res);
        }
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({ error: 'Failed to add device' });
    }
});

// PUT request for /api/device/, and update the device with the required deviceId
router.put('/', (req, res) => {
    const { device_name, description, device_id } = req.body;

    try {
        if (device_id && device_name && device_name != "") {
            DeviceController.updateDeviceById(req, res);
            
        } else {
            console.log("no device_id");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error updating device:', error);
        res.status(500).json({ error: 'Failed to update device' });
    }
});

// DELETE request for /api/device/, and delete the device with the required deviceId
router.delete('/', (req, res) => {
    const device_id = req.params.device_id;

    try {
        if (device_id) {  // if deviceId parameter is available
            DeviceController.deleteDeviceById(device_id, res);
        } else {  // If deviceId parameter is not available     
            console.log("no deviceId");
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        console.error('Error deleting device:', error);
        res.status(500).json({ error: 'Failed to delete device' });
    }

});

module.exports = router;

