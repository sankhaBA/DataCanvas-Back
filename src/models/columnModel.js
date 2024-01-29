const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../../db');
const Table = require('./dataTableModel');
const DataTable = require('./dataTableModel');

// Model for column management with columns clm_id, clm_name, data_type, and tbl_id. tbl_id is referenced from dataTableModel model imported above

class Column extends Model { }

DataTable.init({
    
        clm_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    
        clm_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        data_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        tbl_id: {
            type: DataTypes.INTEGER,
            References: {
                Model: Table,
                key: 'tbl_id'
            }
        },

        default: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Column',
        schema: 'iot-on-earth-public',
        tableName: 'columns',
        timestamps: true,
        underscored: true,

    }
    );

    Column.belongsTo(Table, {
        foreignKey: 'tbl_id',
        as: 'table',
    });

module.exports = Column;

