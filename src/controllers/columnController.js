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
            return res.status(404).json({message:'Culmn data type not found'})
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
          }
async function getAllColumns(req, res) {
    try {
              const columns = await Column.findAll({
                include: [
                  { model: Table, as: 'table' },
                  { model: ColumnDataType, as: 'columnDataType' },
                ],
              });
          
              res.status(200).json(columns);
            } catch (error) {
              console.error('Error getting all columns:', error);
              res.status(500).json({ error: 'Failed to get columns' });
            }
    }        
}
