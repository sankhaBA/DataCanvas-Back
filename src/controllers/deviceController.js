const Device = require('../models/deviceModel');
const Project = require('../models/projectModel');
require('dotenv').config();

async function addDevice(req, res) {
    const { device_name, project_id,description } = req.body;

    try {
        let project = await Project.findOne({ where: { project_id } });

        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
    } catch (error) {  // If error, return error message
        console.error('Error checking project_id:', error);
        res.status(500).json({ error: 'Failed to check project ID' });
        return;
    }


    let fingerprint = await generateFingerprint();

    if(!fingerprint){
        res.status(500).json({ error: 'Failed to generate fingerprint' });
        return;
    }

    try {
        console.log("fingerprint: ", fingerprint);
        let device = await Device.create({ device_name, description, fingerprint, project_id });
        res.status(200).json(device);
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({ error: 'Failed to add device' });
    }
}

async function getDevicesByProjectId(project_id, res) {
    try {
        let devices = await Device.findAll({ where: { project_id } });

        if (devices.length > 0) {
            res.status(200).json(devices);
        } else {
            res.status(404).json({ message: "Devices not found" });
        }
    } catch (error) {
        console.error('Error getting devices by project Id:', error);
        res.status(500).json({ error: 'Failed to get devices by project Id' });
    }
}

async function getDeviceById(device_id, res) {
    try {
        let device = await Device.findOne({ where: { device_id } });

        if (device) {
            res.status(200).json(device);
        }
        else {
            res.status(404).json({ message: "Device not found" });
        }
    } catch (error) {
        console.error('Error getting device by id:', error);
        res.status(500).json({ error: 'Failed to get device by id' });
    }
}

async function getDeviceByFingerprint(fingerprint, res) {
    try {
        let device = await Device.findOne({ where: { fingerprint } });

        if (device) {
            res.status(200).json(device);
        }
        else {
            res.status(404).json({ message: "Device not found" });
        }
    } catch (error) {
        console.error('Error getting device by fingerprint:', error);
        res.status(500).json({ error: 'Failed to get device by fingerprint' });
    }
}

async function updateDeviceById( req, res) {
    const { device_id, device_name, description } = req.body;

    try {
        let updatedRowCount = await Device.update({ device_name, description }, { where: { device_id } });
        if (updatedRowCount > 0) {
            res.status(200).json({message: "Device updated successfully"});
        }
        else {
            res.status(404).json({ message: "Device not found" });
        }
    } catch (error) {
        console.error('Error updating device by id:', error);
        res.status(500).json({ error: 'Failed to update device by id' });
    }
}

async function deleteDeviceById(device_id, res) {
    const deletedDevice = await Device.destroy({ where: { device_id } });
    try {
        if (deletedDevice > 0) {
            res.status(200).json({ message: "Device deleted successfully" });
        } else {
            res.status(404).json({ message: "Device not found" });
        }
    } catch (error) {
        console.error('Error deleting device by id:', error);
        res.status(500).json({ error: 'Failed to delete device by id' });
    }
}

//genrate fingerprint
async function generateFingerprint() {
    let fingerprint = "";
    let deviceWithSameFingerprint;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    do {
        for (let i = 0; i < 32; i++) {
            fingerprint += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        try{
            deviceWithSameFingerprint = await Device.findOne({ where: { fingerprint } });
        } catch (error) {
            console.error('Error checking fingerprint:', error);
            return false;
        }
        
    } while (deviceWithSameFingerprint);

    return fingerprint;
}


module.exports = {
    addDevice,
    getDevicesByProjectId,
    getDeviceById,
    getDeviceByFingerprint,
    updateDeviceById,
    deleteDeviceById,
};