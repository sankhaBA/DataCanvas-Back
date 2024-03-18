const Table = require("../models/dataTableModel");
const Project = require("../models/projectModel");
const Devices = require("../models/deviceModel");
const Column = require("../models/columnModel");
const Constraint = require("../models/constraintModel");
const ColumnConstraint = require("../models/columnConstraintModel");
const DataTypes = require("../models/columnDataTypeModel");
const sequelize = require("./../../db");

const getAllDataOfATable = async (req, res) => {
    const { tbl_id, offset, limit } = req.query;

    const tableName = 'datatable_' + tbl_id;

    console.log('tbl_id:', tbl_id);

    try {
        const table = await Table.findByPk(tbl_id);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        let sql = `SELECT * FROM "iot-on-earth-public"."${tableName}" AS dt INNER JOIN "iot-on-earth-public"."devices" AS d ON d.device_id = dt.device ORDER BY dt.id ASC LIMIT ${limit} OFFSET ${offset}`;
        const data = await sequelize.query(sql);

        res.status(200).json(data[0]);
    } catch (error) {
        console.error('Error retrieving data:', error, tbl_id);
        res.status(500).json({ message: 'Failed to retrieve data' });
    }

};

module.exports = {
    getAllDataOfATable
};