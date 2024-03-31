const Table = require("../models/dataTableModel");
const sequelize = require("./../../db");

const getAllDataOfATable = async (req, res) => {
    const { tbl_id, offset, limit } = req.query;

    const tableName = 'datatable_' + tbl_id;

    try {
        const table = await Table.findByPk(tbl_id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        let sql = `SELECT dt.*, d.device_name FROM "iot-on-earth-public"."${tableName}" AS dt INNER JOIN "iot-on-earth-public"."devices" AS d ON d.device_id = dt.device ORDER BY dt.id ASC LIMIT ${limit} OFFSET ${offset}`;
        const data = await sequelize.query(sql);

        res.status(200).json(data[0]);
    } catch (error) {
        console.error('Error retrieving data:', error, tbl_id);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
};

const getCountOfTable = async (tbl_id, res) => {
    const tableName = 'datatable_' + tbl_id;
    try {
        const table = await Table.findByPk(tbl_id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        let sql = `SELECT COUNT(*) FROM "iot-on-earth-public"."${tableName}"`;
        const data = await sequelize.query(sql);
        res.status(200).json(data[0]);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
}

//Get request to retrieve the count of data records of a project. 
// Get tbl_id s of all the tables of a project using given project_id and then get the count of each table using tables with names datatable_<tbl_id>
// If table count is = 0, then return 0
const getRecordCountOfProject = async (project_id, res) => {
    try {
        // Get only tbl_ids of all tables of a project using Table Model
        const tables = await Table.findAll({
            attributes: ['tbl_id'],
            where: {
                project_id: project_id
            }
        });

        if (!tables || tables.length === 0) {
            return res.status(404).json({ count: 0 });
        }

        let count = 0;
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];

            let sql = `SELECT COUNT(*) FROM "iot-on-earth-public"."datatable_${table.tbl_id}"`;
            const data = await sequelize.query(sql);
            count += Number(data[0][0].count);
        }

        res.status(200).json({ count: Number(count) });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
}

// Get request to retrieve the latest updated_at timestamp of all the tables of a project
const getLatestTimestampOfProject = async (project_id, res) => {
    try {
        // Get only tbl_ids of all tables of a project using Table Model
        const tables = await Table.findAll({
            attributes: ['tbl_id'],
            where: {
                project_id: project_id
            }
        });

        if (!tables || tables.length === 0) {
            return res.status(404).json({ timestamp: null });
        }

        let latestTimestampNumber = 0;
        let timestamp = null;
        for (let i = 0; i < tables.length; i++) {
            const table = tables[i];

            /*
                * Get latest updated_at timestamp from datatable_<table.tbl_id>
                * SELECT MAX(updated_at) FROM datatable_<table.tbl_id>
                * Compare it with latestTimestamp
                * If it is greater than latestTimestamp, update latestTimestamp
            */

            let sql = `SELECT MAX(updated_at) FROM "iot-on-earth-public"."datatable_${table.tbl_id}"`;
            const data = await sequelize.query(sql);

            if (data[0][0].max === null) {
                continue;
            }

            const currentTimestamp = data[0][0].max;

            timestamp = new Date(Math.max(
                timestamp,
                currentTimestamp.getTime(),
            ));
        }

        if (timestamp === null || timestamp == '') {
            return res.status(404).json({ timestamp: null });
        }
        // Convert timestamp to Sri lanka time zone. timestamp is in GMT time
        timestamp = new Date(timestamp);
        timestamp.setHours(timestamp.getHours() + 5);
        timestamp.setMinutes(timestamp.getMinutes() + 30);

        // Remove T.z and milliseconds from timestamp. Convert it to YYYY-MM-DD HH:MM:SS format
        timestamp = timestamp.toISOString().replace(/T/, ' ').replace(/\..+/, '');

        res.status(200).json({ timestamp: timestamp });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }
}

module.exports = {
    getAllDataOfATable,
    getCountOfTable,
    getRecordCountOfProject,
    getLatestTimestampOfProject
};