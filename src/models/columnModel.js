const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../../db');
const Table = require('./dataTableModel');
const ColumnDataType = require('./columnDataTypeModel');

// Model for column management with columns clm_id, clm_name, data_type, and tbl_id. tbl_id is referenced from dataTableModel model imported above

class Column extends Model { }

Column.init({

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
        type: DataTypes.INTEGER,
        References: {
            Model: ColumnDataType,
            key: 'data_type'
        }
    },

    tbl_id: {
        type: DataTypes.INTEGER,
        References: {
            Model: Table,
            key: 'tbl_id'
        }
    },

    default_value: {
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

Column.belongsTo(ColumnDataType, {
    foreignKey: 'data_type',
    as: 'columnDataType',
});

module.exports = Column;

