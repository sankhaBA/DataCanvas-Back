const Table = require("../models/dataTableModel");
const Project = require("../models/projectModel");
const Column = require("../models/columnModel");
const Constraint = require("../models/constraintModel");
const ColumnConstraint = require("../models/columnConstraintModel");
const { DataTypes, Model } = require("sequelize");
const sequelize = require("./../../db");
require("dotenv").config();

async function createTable(req, res) {
  const { tbl_name, project_id } = req.body;

  try {
    let project = await Project.findOne({ where: { project_id } });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
  } catch (error) {
    // If error, return error message
    console.error("Error checking project_id:", error);
    res.status(500).json({ error: "Failed to check project ID" });
    return;
  }

  try {
    let table = await Table.create({ tbl_name, project_id });

    try {
      const column_id = await Column.create({
        clm_name: "id",
        data_type: 1,
        tbl_id: table.tbl_id,
      });
      const column_device = await Column.create({
        clm_name: "device",
        data_type: 1,
        tbl_id: table.tbl_id,
        default_value: -1,
      });

      let constraints = [1, 4];
      for (let i = 0; i < constraints.length; i++) {
        const constraint = await Constraint.findByPk(constraints[i]);
        if (constraint) {
          await ColumnConstraint.create({
            clm_id: column_id.clm_id,
            constraint_id: constraint.constraint_id,
          });
        }
      }
    } catch (error) {
      console.error("Error adding default columns:", error);
      await Table.destroy({ where: { tbl_id: table.tbl_id } });
      res.status(500).json({ error: "Failed to add default columns" });
      return;
    }

    let result = createRelations(table.tbl_id);

    if (result) {
      res.status(200).json(table);
    } else {
      console.error("Error creating relation :", error);
      await Table.destroy({ where: { tbl_id: table.tbl_id } });
      res.status(500).json({ error: "Failed to add default columns" });
    }
  } catch (error) {
    console.error("Error adding table:", error);
    res.status(500).json({ error: "Failed to add table" });
  }
}

async function getTablesByProjectId(project_id, res) {
  try {
    // Check if project exists
    let project = await Project.findOne({ where: { project_id } });

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    let tables = await Table.findAll({ where: { project_id } });

    res.status(200).json(tables);
  } catch (error) {
    console.error("Error getting tables by project Id:", error);
    res.status(500).json({ error: "Failed to get tables by project Id" });
  }
}

async function getTableById(tbl_id, res) {
  try {
    let table = await Table.findOne({ where: { tbl_id } });
    if (table) {
      res.status(200).json(table);
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error getting table by id:", error);
    res.status(500).json({ error: "Failed to get table by id" });
  }
}

async function updateTable(req, res) {
  const { tbl_name, tbl_id } = req.body;
  console.log(tbl_name, tbl_id);
  try {
    let updatedTable = await Table.update({ tbl_name }, { where: { tbl_id } });
    if (updatedTable > 0) {
      res.status(200).json({ message: "Table updated successfully" });
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error updating table:", error);
    res.status(500).json({ error: "Failed to update table" });
  }
}

async function truncateTable(req, res) {
  res.status(200).json({ message: "Truncate table function not created yet" });
}

async function deleteTable(tbl_id, res) {
  const deletedTable = await Table.destroy({ where: { tbl_id } });
  try {
    if (deletedTable > 0) {
      res.status(200).json({ message: "Table deleted successfully" });
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ error: "Failed to delete table" });
  }
}

async function deleteAllTable(project_id, res) {
  const deletedTable = await Table.destroy({ where: { project_id } });
  try {
    if (deletedTable > 0) {
      res.status(200).json({ message: "Table deleted successfully" });
    } else {
      res.status(404).json({ message: "Table not found" });
    }
  } catch (error) {
    console.error("Error deleting tables:", error);
    res.status(500).json({ error: "Failed to delete all tables" });
  }
}

async function createRelations(tbl_id) {
  /*
    Define a table using sequelize. table name should be datatable_<tbl_id>
    It should have 2 columns as id and device and data type of both tables should be integer
    id column should have constraints as primary key and auto increment
    device column should have default value as -1
    device column should have foreign key constraint to id column of device table
  */

  try {
    const tableName = `datatable_${tbl_id}`;
    const table = sequelize.define(
      tableName,
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        device: {
          type: DataTypes.INTEGER,
          defaultValue: -1,
          references: {
            model: tableName,
            key: "id",
          },
        },
      },
      {
        timestamps: true,
        underscored: true,
        schema: "iot-on-earth-public",
        tableName: tableName,
      }
    );

    // Synchronize table
    table.sync({ force: true });

    return true;
  } catch (error) {
    console.error("Error creating relations:", error);
    return false;
  }
}

module.exports = {
  createTable,
  getTablesByProjectId,
  getTableById,
  updateTable,
  truncateTable,
  deleteTable,
  deleteAllTable,
};
