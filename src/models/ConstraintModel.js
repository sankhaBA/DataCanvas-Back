const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');



class Constraint extends Model { }

Constraint.init({
    
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
        modelName: 'Constraint',
        schema: 'iot-on-earth-public',
        tableName: 'constraint',
        underscored: true
    
    }
    );
    
module.exports = Constraint;