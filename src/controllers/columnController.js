const ColumnConstraint = require('../models/columnConstraintModel');
const ColumnDataType = require('../models/columnDataTypeModel');
const Column = require('../models/columnModel');
const Table = require('../models/dataTableModel');
const Constraint = require('../models/constraintModel');
require('dotenv').config();

async function addColumn(req, res) {
  const { clm_name, data_type, tbl_id, default_value, max_length, constraints } = req.body;

  try {
    const table = await Table.findByPk(tbl_id);
    if (!table) {
      res.status(404).json({ message: 'Table not found' });
      return;
    }

    const column = await Column.create({ clm_name, data_type, tbl_id, default_value, max_length });

    if (column) {
      if (constraints) {
        /*
          CONSTRAINTS ARE IN THIS TYPE
          constraints = [1,2,3] // array of constraint ids
          These should be added to ColumnConstraint table along with clm_id
        */
        try {
          for (let i = 0; i < constraints.length; i++) {
            const constraint = await Constraint.findByPk(constraints[i]);
            if (constraint) {
              await ColumnConstraint.create({ clm_id: column.clm_id, constraint_id: constraint.constraint_id });
            }
          }
        } catch (error) {
          // Rollback the column creation and added column constraints
          await column.destroy();
          //Rollback column constraints added with the column ID
          await ColumnConstraint.destroy({ where: { clm_id: column.clm_id } });
          // Send error response
          console.error('Error adding column constraints:', error);
          res.status(500).json({ error: 'Failed to add column' });
          return;
        }
      }

      res.status(201).json(column);
    } else {
      res.status(500).json({ error: 'Failed to add column' });
    }
  } catch (error) {
    console.error('Error adding column:', error);
    res.status(500).json({ error: 'Failed to add column' });
  }
}

//get columns by table id          
async function getAllColumns(tbl_id, res) {
  // Check for table existence
  try {
    const table = await Table.findByPk(tbl_id);
    if (!table) {
      res.status(404).json({ message: 'Table not found' });
      return;
    }
  } catch (error) {
    console.error('Error getting table by ID:', error);
    res.status(500).json({ error: 'Failed to get table' });
  }

  try {
    const columns = await Column.findAll({
      where: { tbl_id },
      attributes: {
        exclude: ['createdAt', 'updatedAt'] // Exclude timestamp columns
      },
      include: [
        {
          model: ColumnConstraint,
          as: 'constraints',
          attributes: ['constraint_id'],
        }
      ]
    });
    res.status(200).json(columns);

  } catch (error) {
    console.error('Error getting all columns:', error);
    res.status(500).json({ error: 'Failed to get columns of table' });
  }
}

//get columns by id    
async function getColumnById(clm_id, res) {
  try {
    const column = await Column.findByPk(clm_id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'] // Exclude timestamp columns
      },
      include: [
        {
          model: ColumnConstraint,
          as: 'constraints',
          attributes: ['constraint_id'],
        }
      ]
    });

    if (!column) {
      res.status(404).json({ message: 'Column not found' });
      return;
    }

    res.status(200).json(column);
  } catch (error) {
    console.error('error getting column by id:', error);
    res.status(500).json({ error: 'failed to get column' });
  }
}

//update the column by its ID
async function updateColumnById(req, res) {
  const { clm_id, clm_name, data_type, default_value, max_length, constraints } = req.body;

  try {
    const column = await Column.findByPk(clm_id);
    if (!column) {
      res.status(404).json({ message: 'Column not found' });
      return;
    }

    const updatedColumn = await column.update({ clm_name, data_type, default_value, max_length }, { where: { clm_id } });

    if (updatedColumn) {
      // Get ids of rows of column constraint table with the clm_id
      const oldColumnConstraints = await ColumnConstraint.findAll({ where: { clm_id } });

      // Remove all constraints related to this column
      await ColumnConstraint.destroy({ where: { clm_id } });

      if (constraints) {
        try {
          for (let i = 0; i < constraints.length; i++) {
            const constraint = await Constraint.findByPk(constraints[i]);
            if (constraint) {
              await ColumnConstraint.create({ clm_id, constraint_id: constraint.constraint_id });
            }
          }
        } catch (error) {
          // Rollback the column update and added column constraints
          await updatedColumn.update(column.dataValues);
          //Rollback column constraints added with the column ID
          await ColumnConstraint.destroy({ where: { clm_id } });
          // Add back old constraints
          for (let i = 0; i < oldColumnConstraints.length; i++) {
            await ColumnConstraint.create({ clm_id, constraint_id: oldColumnConstraints[i].constraint_id });
          }
          // Send error response
          console.error('Error adding column constraints:', error);
          res.status(500).json({ error: 'Failed to update column' });
          return;
        }
      }

      res.status(200).json({ message: 'Column updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update column' });
    }
  } catch (error) {
    console.error('Error updating column by ID:', error);
    res.status(500).json({ error: 'Failed to update column' });
  }
}

//delete column
async function deleteColumnById(req, res) {
  const { id } = req.params;

  try {
    const column = await Column.findByPk(id);
    if (!column) {
      res.status(404).json({ message: 'Column not found' });
      return;
    }
    await column.destroy();
    res.status(200).json({ message: 'Column deleted successfully' });
  } catch (error) {
    console.error('Error deleting column by ID:', error);
    res.status(500).json({ error: 'Failed to delete column' });
  }

}

module.exports = {
  getAllColumns,
  getColumnById,
  addColumn,
  updateColumnById,
  deleteColumnById
};
