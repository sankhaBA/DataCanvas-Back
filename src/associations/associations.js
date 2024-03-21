const Column = require('./../models/columnModel');
const Constraint = require('./../models/constraintModel');
const ColumnConstraint = require('./../models/columnConstraintModel');
const Widget = require('../models/widgetModel');
const DataTable = require('../models/dataTableModel');

// Set up associations after all models are defined
console.log('Setting up associations...');
//Column.belongsToMany(Constraint, { through: ColumnConstraint, foreignKey: 'clm_id' });
//Constraint.belongsToMany(Column, { through: ColumnConstraint, foreignKey: 'constraint_id' });
ColumnConstraint.belongsTo(Column, { foreignKey: 'clm_id' });
Column.hasMany(ColumnConstraint, { foreignKey: 'clm_id', as: 'constraints' });
ColumnConstraint.belongsTo(Constraint, { foreignKey: 'constraint_id' });
Constraint.hasMany(ColumnConstraint, { foreignKey: 'constraint_id' });


Widget.belongsTo(DataTable, {
    foreignKey: 'widgets_dataset_fkey',
});