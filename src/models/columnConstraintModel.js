const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const Column = require('./columnModel');
const Constraint = require('./ConstraintModel');


// Model for Constraint management with columns id and clm_id, constraint_id. clm_id and constraint_id are referenced from columnModel and ConstraintModel models imported above

class Constraint extends Model { }

Constraint.init({

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    clm_id: {
        type: DataTypes.INTEGER,
        References: {
            Model: Column,
            key: 'clm_id'
        }
    },

    constraint_id: {
        type: DataTypes.INTEGER,
        References: {
            Model: Constraint,
            key: 'constraint_id'
        }
    }
}, {
    sequelize,
    modelName: 'Constraint',
    schema: 'iot-on-earth-public',
    tableName: 'constraints',
    timestamps: true,
    underscored: true

}
);


Constraint.belongsTo(Column, {
    foreignKey: 'clm_id',
    as: 'column',
});

Constraint.belongsTo(ColumnConstraint, {
    foreignKey: 'constraint_id',
    as: 'columnConstraint',
});

module.exports = Constraint;
