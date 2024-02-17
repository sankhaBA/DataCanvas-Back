const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../db');
const Column = require('./columnModel');
const Constraint = require('./constraintModel');


// Model for Constraint management with columns id and clm_id, constraint_id. clm_id and constraint_id are referenced from columnModel and ConstraintModel models imported above
class ColumnConstraint extends Model { }

ColumnConstraint.init({

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
    modelName: 'ColumnConstraint',
    schema: 'iot-on-earth-public',
    tableName: 'columnconstraint',
    timestamps: true,
    underscored: true

}
);


ColumnConstraint.belongsTo(Column, {
    foreignKey: 'clm_id',
    as: 'column',
});

ColumnConstraint.belongsTo(Constraint, {
    foreignKey: 'constraint_id',
    as: 'constraint',
});

module.exports = ColumnConstraint;
