const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');



class ColumnConstraint extends Model { }

ColumnConstraint.init({
    
        constraint_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    
        constraint_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ColumnConstraint',
        schema: 'iot-on-earth-public',
        tableName: 'column_constraints',
        underscored: true
    
    }
    );
    
module.exports = ColumnConstraint;