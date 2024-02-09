const ColumnDataType = require('../models/columnDataTypeModel');
const Column = require('../models/columnModel');
const Table = require('../models/dataTableModel');
require('dotenv').config();

async function addColumn(req,res){
    const { clm_name,data_type,tbl_id,default_value } = req.body;

    try{
        //checking if the table exists
        const table = await Table.findByPk(tbl_id);
        if(!table){
            return res.status(404).json({message:'Table not found'})
        }

        //check if the referenced column data type exists
        const columnDataType = await ColumnDataType.findByPk(data_type);
        if(!columnDataType){
            return res.status(404).json({message:'Column data type not found'})
        }

        //create new coulmn
        const newColumn = await Column.create({
            clm_name,
            data_type,
            tbl_id,
            default_value,
        });
    
        res.status(201).json(newColumn);
    }
        catch (error) {
            console.error('Error creating column:', error);
            res.status(500).json({ error: 'Failed to create column' });
          }}
//get columns by table id          
async function getAllColumns(req, res) {
  const {tbl_id} = req.params;
    try {
              const columns = await Column.findAll({
                where: {tbl_id}, include:
                res.status(200).json(columns)
              });
          
        } catch (error) {
              console.error('Error getting all columns:', error);
              res.status(500).json({ error: 'Failed to get columns of table' });
            }
    }

//get columns by id    
async function getColumnById(req,res){
  const{id} = req.params;
  try{
    const coulmn = await Column.findByPk(id, { include: [Table,ColumnDataType]});
    if (!coulmn){
      res.status(404).json({message: 'Column not found'});
      return;
    }
    res.status(200).json(coulmn);
  } catch (error) {
    console.error('error getting nby colun id:',error);
    res.status(500).json({error:'failed to get column by ID'});
  }
}

//update the column by its ID
async function updateColumnById(req,res){
  const {id} = req.params;
  const {clm_name,data_type,tbl_id,default_value} = req.body;
  try {
    const column = await Column.findByPk(id);
    if (!column){
      res.status(404).json({message:'Column not found'});
      return
    }

    await column.update({clm_name,data_type,tbl_id,default_value})
    res.status(200).json({message:'column updated successfully'});

  } catch (error) {
    console.error('Error updating column by ID:', error);
    res.status(500).json({ error: 'Failed to update column' });
  }
}

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
