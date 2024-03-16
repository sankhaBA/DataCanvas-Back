const Table = require("../models/dataTableModel");
const Project = require("../models/projectModel");
const Devices = require("../models/deviceModel");
const Column = require("../models/columnModel");
const Constraint = require("../models/constraintModel");
const ColumnConstraint = require("../models/columnConstraintModel");
const DataTypes = require("../models/columnDataTypeModel");
const sequelize = require("./../../db");

async function insertData(req, res) {
  /*
   * Request body should contain:
   * project_id: Project ID - INTEGER
   * fingerprint: Device fingerprint - STRING of 32 characters
   * table: Table name - STRING
   * data: Data to be inserted - JSON object
   * Sample data section
   * data: {
   *   "column1": "value1", - Data type of the value should match the data type of the column
   *   "column2": "value2", - Data type of the value should match the data type of the column
   *   "column3": "value3", - Data type of the value should match the data type of the column
   * }
   */
  const { project_id, fingerprint, table, data } = req.body;

  try {
    // Validate project_id, fingerprint and table
    const device_id = await validateDevice(fingerprint);
    const tbl_id = await validateTable(table);

    if (!validateProject(project_id)) {
      res.status(404).json({ error: "Project not found | CHECK project_id" });
      return;
    }

    if (!device_id) {
      res.status(404).json({ error: "Device not found | CHECK fingerprint" });
      return;
    }
    if (!tbl_id) {
      res.status(404).json({ error: "Table not found | CHECK table name" });
      return;
    }

    /* 
        * Get all columns of the table
        * Structure of the columns object
        * columns: [
        *   {
                "clm_id": 40,
                "clm_name": "id",
                "data_type": 1,
                "tbl_id": 26,
                "default_value": null,
                "max_length": null,
                "constraints": [
                    {
                        "constraint_id": 1
                    },
                    {
                        "constraint_id": 4
                    }
                ]
            },
            {
                "clm_id": 42,
                "clm_name": "temperature_in",
                "data_type": 2,
                "tbl_id": 26,
                "default_value": "",
                "max_length": 0,
                "constraints": []
            },
        * ]
        */
    const columns = await getColumns(tbl_id);
    if (!columns) {
      res.status(404).json({ error: "Fields not found | CHECK table name" });
      return;
    }

    /*
     * Check if all the columns in the data object are available in the columns list, if not, send bad request
     * All the columns in the columns list is not needed to be in the data object, but all the columns in the data object should be in the columns list
     * Also check if the data type of the value matches the data type of the column, if not, send bad request
     * Check the columns list and if there are any columns with constraints of constraint_id 2 (NOT NULL), check if the data object contains those columns, if not, send bad request
     * If any of the above conditions are not met, send bad request with the appropriate message and return
     * If there are extra columns in the data object that are not in the columns list, send bad request with the appropriate message and return
     * Data object looks like this
     * data: {
     *   "column1": "value1", - Data type of the value should match the data type of the column
     *   "column2": "value2", - Data type of the value should match the data type of the column
     *   "column3": "value3", - Data type of the value should match the data type of the column
     * }
     */

    let foundColumn = false;
    for (let column in data) {
      foundColumn = columns.find((clm) => {
        if (clm.clm_name == column) {
          return clm;
        } else {
          return false;
        }
      });

      if (!foundColumn) {
        res
          .status(400)
          .json({ error: `Column ${column} not found | CHECK column name` });
        return;
      }

      // Check data type of the value
      if (!validateColumnDataType(foundColumn.data_type, data[column])) {
        res.status(400).json({
          error: `Data type of ${column} does not match | CHECK data type`,
        });
        return;
      }

      // Check max length of the value
      if (
        foundColumn.max_length != null &&
        foundColumn.dataType == 2 &&
        !validateColumnMaxLength(foundColumn.max_length, data[column])
      ) {
        res.status(400).json({
          error: `Max length of ${column} exceeded | CHECK data length`,
        });
        return;
      }

      // Check if the column has constraint of NOT NULL
      let notNull = foundColumn.constraints.find((constraint) => {
        if (constraint.constraint_id == 2) {
          return true;
        } else {
          return false;
        }
      });

      if ((notNull && !data[column] == null) || data[column] == undefined) {
        res.status(400).json({
          error: `Column ${column} cannot be NULL | CHECK column value`,
        });
        return;
      }
    }

    // Get all the columns from columns list that have constraint_id = 2
    let notNullColumns = columns.filter((clm) => {
      let notNull = clm.constraints.find((constraint) => {
        if (constraint.constraint_id == 2) {
          return true;
        } else {
          return false;
        }
      });
      if (notNull) {
        return clm;
      }
    });

    // Check if the data object contains all the columns that included in the notNullColumns list
    for (let clm of notNullColumns) {
      if (!data[clm.clm_name]) {
        res.status(400).json({
          error: `Column ${clm.clm_name} cannot be NULL | CHECK column value`,
        });
        return;
      }
    }

    // Insert data
    let insertData = `INSERT INTO "iot-on-earth-public"."datatable_${tbl_id}" (device,`;
    let values = ` VALUES (${device_id}, `;
    // Loop through the data object and create the insert query
    for (let column in data) {
      insertData += `${column}, `;
      values += `'${data[column]}', `;
    }

    insertData = insertData.slice(0, -1) + ")";
    values = values.slice(0, -2) + ")";
    insertData += values;

    try {
      let result = await sequelize.query(insertData);
      res.status(200).json({ message: "Data inserted successfully" });
      return;
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({
        message: "Failed to insert data | Something went wrong",
        error: error,
      });
      return;
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res
      .status(500)
      .json({ message: "Failed to insert data | Something wetn wrong" });
    return;
  }
}

async function updateData(req, res) {
  const { project_id, fingerprint, table, index_column, index_value } =
    req.body;
  try {
    // Validate project_id, fingerprint, table, index_column and index_value
    const device_id = await validateDevice(fingerprint);
    const tbl_id = await validateTable(table);

    if (!validateProject(project_id)) {
      res.status(404).json({ error: "Project not found | CHECK project_id" });
      return;
    }
    if (!device_id) {
      res.status(404).json({ error: "Device not found | CHECK fingerprint" });
      return;
    }
    if (!tbl_id) {
      res.status(404).json({ error: "Table not found | CHECK table name" });
      return;
    }
    if (!index_column || !index_value) {
      res
        .status(400)
        .json({ error: "Bad Request | CHECK index_column, index_value" });
      return;
    }
    if (index_column.trim() == "" || index_value.trim() == "") {
      res
        .status(400)
        .json({ error: "Bad Request | CHECK index_column, index_value" });
      return;
    }
    if (isNaN(index_value)) {
      res.status(400).json({ error: "Bad Request | CHECK index_value" });
      return;
    }
    // Get all columns of the table
    const columns = await getColumns(tbl_id);
    if (!columns) {
      res.status(404).json({ error: "Fields not found | CHECK table name" });
      return;
    }
    // Check if the index_column is available in the columns list
    let foundColumn = columns.find((clm) => {
      if (clm.clm_name == index_column) {
        return clm;
      } else {
        return false;
      }
    });
    if (!foundColumn) {
      res.status(400).json({
        error: `Column ${index_column} not found | CHECK index_column`,
      });
      return;
    }
    // Check if the index_column has constraint of PRIMARY KEY
    let primaryKey = foundColumn.constraints.find((constraint) => {
      if (constraint.constraint_id == 1) {
        return true;
      } else {
        return false;
      }
    });
    if (!primaryKey) {
      res.status(400).json({
        error: `Column ${index_column} is not a PRIMARY KEY | CHECK index_column`,
      });
      return;
    }
    // Update data
    let updateData = `UPDATE "iot-on-earth-public"."datatable_${tbl_id}" SET `;
    let values = ` VALUES (${device_id}, `;
    // Loop through the data object and create the update query
    for (let column in req.body) {
      updateData += `${column} ,`;
      values += `'${data[column]}', `;
    }

    updateData = updateData.slice(0, -1) + ")";
    values = values.slice(0, -2) + ")";
    updateData += values;

    try {
      let result = await sequelize.query(updateData);
      res.status(200).json({ message: "Data updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Failed to update data" });
      return;
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Failed to update data" });
    return;
  }
}

// Check project_id is a valid and available project
const validateProject = async (project_id) => {
  try {
    let project = await Project.findOne({ where: { project_id } });

    if (!project) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking project_id:", error);
    return false;
  }
};

// Check fingerprint is from valid and available device
const validateDevice = async (fingerprint) => {
  try {
    let device = await Devices.findOne({ where: { fingerprint } });

    if (!device) {
      return false;
    }

    return device.device_id;
  } catch (error) {
    console.error("Error checking device:", error);
    return false;
  }
};

// Check table is a name from a valid and available table and return tbl_id
const validateTable = async (table) => {
  try {
    let tbl = await Table.findOne({ where: { tbl_name: table } });

    if (!tbl) {
      return false;
    }

    return tbl.tbl_id;
  } catch (error) {
    console.error("Error checking table:", error);
    return false;
  }
};

// Get all columns of a table
const getColumns = async (tbl_id) => {
  try {
    const columns = await Column.findAll({
      where: { tbl_id },
      attributes: {
        exclude: ["createdAt", "updatedAt"], // Exclude timestamp columns
      },
      include: [
        {
          model: ColumnConstraint,
          as: "constraints",
          attributes: ["constraint_id"],
        },
      ],
    });

    if (!columns || columns.length == 0) {
      return false;
    }

    return columns;
  } catch (error) {
    console.error("Error getting columns:", error);
    return false;
  }
};

const validateColumnDataType = async (dataType, data) => {
  /*
   * Data types
   * 1 - INTEGER
   * 2 - DOUBLE
   * 3 - STRING
   */

  if (dataType == 1) {
    if (isNaN(data) || !Number.isInteger(data)) {
      return false;
    }
  } else if (dataType == 2) {
    if (isNaN(data)) {
      return false;
    }
  } else if (dataType == 3) {
    if (typeof data != "string") {
      return false;
    }
  }

  return true;
};

const validateColumnMaxLength = async (maxLength, data) => {
  if (data.length > maxLength) {
    return false;
  }

  return true;
};

module.exports = {
  insertData,
  updateData,
};
