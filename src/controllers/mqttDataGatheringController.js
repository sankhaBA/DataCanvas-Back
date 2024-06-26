const Table = require("../models/dataTableModel");
const Project = require("../models/projectModel");
const Devices = require("../models/deviceModel");
const Column = require("../models/columnModel");
const ColumnConstraint = require("../models/columnConstraintModel");
const sequelize = require("./../../db");

async function insertData(requestData) {
    const { project_id, fingerprint, table, data } = requestData;

    try {
        const device_id = await validateDevice(fingerprint);
        const tbl_id = await validateTable(project_id, table);

        if (!await validateProject(project_id)) {
            throw new Error("Project not found | CHECK project_id");
        }

        if (!device_id) {
            throw new Error("Device not found | CHECK fingerprint");
        }
        if (!tbl_id) {
            throw new Error("Table not found | CHECK table name");
        }

        const columns = await getColumns(tbl_id);
        if (!columns) {
            throw new Error("Fields not found | CHECK table name");
        }

        let foundColumn = false;
        for (let column in data) {
            foundColumn = columns.find((clm) => clm.clm_name === column);

            if (!foundColumn) {
                throw new Error(`Column ${column} not found | CHECK column name`);
            }

            if (!validateColumnDataType(foundColumn.data_type, data[column])) {
                throw new Error(`Data type of ${column} does not match | CHECK data type`);
            }

            if (foundColumn.max_length != null && foundColumn.dataType == 2 && !validateColumnMaxLength(foundColumn.max_length, data[column])) {
                throw new Error(`Max length of ${column} exceeded | CHECK data length`);
            }

            let foundColumnConstraints = JSON.stringify(foundColumn.constraints);
            foundColumnConstraints = JSON.parse(foundColumnConstraints);
            let autoIncrement = foundColumnConstraints.some((constraint) => constraint.constraint_id === 1);
            let notNull = foundColumnConstraints.some((constraint) => constraint.constraint_id === 2);

            if (autoIncrement) {
                if (data[column]) {
                    throw new Error(`Column ${column} has auto increment | CHECK Column value should not be sent`);
                }
            } else {
                if (notNull && !data[column] == null || data[column] == undefined) {
                    throw new Error(`Column ${column} cannot be NULL | CHECK column value`);
                }
            }
        }

        let notNullColumns = columns.filter((clm) => {
            let notNull = clm.constraints.find((constraint) => constraint.constraint_id === 2);
            let autoIncrement = clm.constraints.find((constraint) => constraint.constraint_id === 1);
            return !autoIncrement && notNull;
        });

        for (let clm of notNullColumns) {
            if (!data[clm.clm_name]) {
                throw new Error(`Column ${clm.clm_name} cannot be NULL | CHECK column value`);
            }
        }

        let insertData = `INSERT INTO "iot-on-earth-public"."datatable_${tbl_id}" (device,`;
        let values = ` VALUES (${device_id}, `;
        for (let column in data) {
            insertData += `${column},`;
            values += `'${data[column]}', `;
        }

        insertData = insertData.slice(0, -1) + ')';
        values = values.slice(0, -2) + ')';
        insertData += values;

        await sequelize.query(insertData);
        return { message: 'Data inserted successfully' };
    } catch (error) {
        throw new Error(`Failed to insert data | ${error.message}`);
    }
}

// Validation functions
async function validateProject(project_id) {
    try {
        let project = await Project.findOne({ where: { project_id } });
        return !!project;
    } catch (error) {
        console.error('Error checking project_id:', error);
        return false;
    }
}

async function validateDevice(fingerprint) {
    try {
        let device = await Devices.findOne({ where: { fingerprint } });
        return device ? device.device_id : false;
    } catch (error) {
        console.error('Error checking device:', error);
        return false;
    }
}

async function validateTable(project, table) {
    try {
        let tbl = await Table.findOne({ where: { tbl_name: table, project_id: project } });
        return tbl ? tbl.tbl_id : false;
    } catch (error) {
        console.error('Error checking table:', error);
        return false;
    }
}

async function getColumns(tbl_id) {
    try {
        const columns = await Column.findAll({
            where: { tbl_id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: ColumnConstraint, as: 'constraints', attributes: ['constraint_id'] }]
        });

        return columns.length ? columns : false;
    } catch (error) {
        console.error('Error getting columns:', error);
        return false;
    }
}

function validateColumnDataType(dataType, data) {
    if (data == null || data == undefined) {
        return true;
    }

    if (dataType == 1) {
        return Number.isInteger(parseInt(data));
    } else if (dataType == 2) {
        return !isNaN(data);
    } else if (dataType == 3) {
        return typeof data === 'string';
    }

    return false;
}

function validateColumnMaxLength(maxLength, data) {
    return data.length <= maxLength;
}

module.exports = {
    insertData
};
