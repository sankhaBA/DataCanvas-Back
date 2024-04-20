const Table = require("../models/dataTableModel");
const Project = require("../models/projectModel");
const Device = require("../models/deviceModel");
const Column = require("../models/columnModel");
const Widget = require("../models/widgetModel");
const ChartWidget = require("../models/chartWidgetModel");
const ChartSeries = require("../models/chartSeriesModel");
const ParameterTableWidget = require("../models/parameterTableWidgetModel");
const ToggleWidget = require("../models/toggleWidgetModel");
const GaugeWidget = require("../models/gaugeWidgetModel");
const sequelize = require("../../db");

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

/*
    * Search function for the search functionality in front end
    * Search in :
        ** Projects by project_name belongs to the specific user
        ** Devices by device_name belongs to the projects of the specific user
        ** DataTables by the tbl_name belongs to the projects of the specific user
        ** Widgets by the widget_name belongs to the projects of the specific user
    * Load all projects of the specific user in order to search in other models
    * Search in each model and return the results as the following object :
    * {
    *   projects: [
    *       {
    *           project_id: 1,
    *           project_name: 'Project 1',
    *       },
    *       // More projects
    *   ],
    *   devices: [
    *       {
    *           device_id: 1,
    *           device_name: 'Device 1',
    *       },
    *       // More devices
    *   ],
    *   datatables: [// like above],
    *   widgets: [// like above]
    * }
    * When searching through models, filter queries by selecting the id and name of each model as filtering attributes to reduce the load time
    * If any error occurs, send a 500 response
    * If there are no results, send the object in above structure with a 200 response
*/
const searchWholeProject = async (search_keyword, user_id, res) => {

}

/*
    * Get data for a toggle widget
    * Load Widget Details Including its Configuration  (Refer getWidgetByID function in widgetController)
    * If the widget is not available, send a 404 Not Found error and return
    * Retrieve clm_name using Column model of the clm_id in widget configuration
    * Get the latest record from the relevant table by generating the correct SQL query.
    * SQL query details are as follows
    * Table name : datatable_<dataset> from widget
    * column : clm_name retrieved earlier
    * where : filter by device_id in widget configuration
    * Get only the latest record by sorting records by id
    * Validate the value whether it is true or false. 
    * If it is true or false, send data with a 200 response
    * If not, send data with a 500 response
    * Wrap all these things with a try-catch block and if any error ocurrs, send 500 response
*/
const getToggleData = async (widget_id, res) => {

}

/*
    * Get data for a gauge  widget
    * Load Widget Details Including its Configuration  (Refer getWidgetByID function in widgetController)
    * If the widget is not available, send a 404 Not Found error and return
    * Retrieve clm_name using Column model of the clm_id in widget configuration
    * Get the latest record from the relevant table by generating the correct SQL query.
    * SQL query details are as follows
    * Table name : datatable_<dataset> from widget
    * column : clm_name retrieved earlier
    * where : filter by device_id in widget configuration
    * Get only the latest record by sorting records by id
    * Validate the value whether it is a number. 
    * If it is a number, send data with a 200 response
    * If not, send data with a 500 response
    * Wrap all these things with a try-catch block and if any error ocurrs, send 500 response
*/
const getGaugeData = async (widget_id, res) => {

}

/*
    * Function for loading data of parameter table widgets
*/
const getParameterTableData = async (widget_id, res) => {

}

/*
    * Function for loading data of chart widgets
*/
const getChartData = async (widget_id, res) => {

}


module.exports = {
    getAllDataOfATable,
    getCountOfTable,
    getRecordCountOfProject,
    getLatestTimestampOfProject,
    getToggleData,
    getGaugeData,
    getParameterTableData,
    getChartData
};