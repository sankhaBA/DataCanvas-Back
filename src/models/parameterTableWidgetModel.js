const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const Column = require('./columnModel');
const Widget = require('./widgetModel');

class ParameterTableWidget extends Model { }

ParameterTableWidget.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    widget_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Widget,
            key: 'id'
        }
    },
    clm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Column,
            key: 'clm_id'
        }
    }
}, {
    sequelize,
    modelName: 'ParameterTableWidget',
    schema: 'iot-on-earth-public',
    tableName: 'paremetertables',
    timestamps: true,
    underscored: true
});

module.exports = ParameterTableWidget; 
