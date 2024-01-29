const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');

// Model for columnDataType management with columns type_id and type_name.

class ColumnDataType extends Model { }

ColumnDataType.init({
    
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    
        type_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ColumnDataType',
        schema: 'iot-on-earth-public',
        tableName: 'column_data_types',
        timestamps: true,
        underscored: true
    
    }
    );

module.exports = ColumnDataType;


