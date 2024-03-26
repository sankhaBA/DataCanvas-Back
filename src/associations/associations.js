const Column = require('./../models/columnModel');
const Constraint = require('./../models/constraintModel');
const ColumnConstraint = require('./../models/columnConstraintModel');
const Widget = require('../models/widgetModel');
const DataTable = require('../models/dataTableModel');
const Chart = require('../models/chartModel');
const ChartSeries = require('../models/chartSeriesModel');

// Set up associations after all models are defined
console.log('Setting up associations...');
ColumnConstraint.belongsTo(Column, { foreignKey: 'clm_id' });
Column.hasMany(ColumnConstraint, { foreignKey: 'clm_id', as: 'constraints' });
ColumnConstraint.belongsTo(Constraint, { foreignKey: 'constraint_id' });
Constraint.hasMany(ColumnConstraint, { foreignKey: 'constraint_id' });

Widget.belongsTo(DataTable, {
    foreignKey: 'widgets_dataset_fkey',
});

Chart.belongsTo(Widget, {
    foreignKey: 'charts_widget_fkey',
});

Chart.belongsTo(Column, {
    foreignKey: 'charts_x_axis_fkey',
});

ChartSeries.belongsTo(Chart, {
    foreignKey: 'chartseries_chart_id_fkey',
});

ChartSeries.belongsTo(Column, {
    foreignKey: 'chartseries_clm_id_fkey',
});