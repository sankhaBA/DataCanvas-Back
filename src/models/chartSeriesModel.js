const { DataTypes, Model } = require('sequelize');
const sequelize = require('./../../db'); // Import the Sequelize instance
const ChartWidget = require('./chartWidgetModel');
const Column = require('./columnModel');

class ChartSeries extends Model { }

ChartSeries.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        chart_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            References: {
                Model: ChartWidget,
                key: 'chart_id',
            },
        },
        clm_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            References: {
                Model: Column,
                key: 'clm_id',
            },
        },
    },
    {
        sequelize, // Pass the initialized Sequelize instance
        modelName: 'ChartSeries', // Set the model name
        schema: 'iot-on-earth-public', // Set the schema name (if applicable)
        tableName: 'chartseries', // Set the table name explicitly (optional)
        timestamps: true, // Enable timestamps (createdAt, updatedAt)
        underscored: true, // Use snake_case for column names
    }
);

module.exports = ChartSeries;