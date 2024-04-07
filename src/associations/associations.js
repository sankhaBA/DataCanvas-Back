const Device = require('./../models/deviceModel');
const Column = require('./../models/columnModel');
const Constraint = require('./../models/constraintModel');
const ColumnConstraint = require('./../models/columnConstraintModel');
const Widget = require('../models/widgetModel');
const DataTable = require('../models/dataTableModel');
const ChartWidget = require('../models/chartWidgetModel');
const ChartSeries = require('../models/chartSeriesModel');
const ParameterTableWidget = require('../models/parameterTableWidgetModel');

// Set up associations after all models are defined
console.log('Setting up associations...');
ColumnConstraint.belongsTo(Column, { foreignKey: 'clm_id' });
Column.hasMany(ColumnConstraint, { foreignKey: 'clm_id', as: 'constraints' });
ColumnConstraint.belongsTo(Constraint, { foreignKey: 'constraint_id' });
Constraint.hasMany(ColumnConstraint, { foreignKey: 'constraint_id' });

Widget.belongsTo(DataTable, {
    foreignKey: 'widgets_dataset_fkey',
});

ChartWidget.belongsTo(Widget, {
    foreignKey: 'charts_widget_fkey',
});

ChartWidget.belongsTo(Column, {
    foreignKey: 'charts_x_axis_fkey',
});

ChartSeries.belongsTo(ChartWidget, {
    foreignKey: 'chartseries_chart_id_fkey',
});

ChartSeries.belongsTo(Column, {
    foreignKey: 'chartseries_clm_id_fkey',
});

ChartSeries.belongsTo(Device, {
    foreignKey: 'chartseries_device_id_fkey',
});

ParameterTableWidget.belongsTo(Widget, {
    foreignKey: 'parametertables_widget_id_fkey',
});

ParameterTableWidget.belongsTo(Column, {
    foreignKey: 'parametertables_clm_id_fkey',
});

ParameterTableWidget.belongsTo(Device, {
    foreignKey: 'parametertables_device_id_fkey',
});