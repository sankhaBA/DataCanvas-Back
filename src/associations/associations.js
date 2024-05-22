const Project = require('./../models/projectModel');
const Device = require('./../models/deviceModel');
const Column = require('./../models/columnModel');
const Constraint = require('./../models/constraintModel');
const ColumnConstraint = require('./../models/columnConstraintModel');
const Widget = require('../models/widgetModel');
const DataTable = require('../models/dataTableModel');
const ChartWidget = require('../models/chartWidgetModel');
const ChartSeries = require('../models/chartSeriesModel');
const ParameterTableWidget = require('../models/parameterTableWidgetModel');
const ToggleWidget = require('../models/toggleWidgetModel');
const GaugeWidget = require('../models/gaugeWidgetModel');

// Set up associations after all models are defined
console.log('Setting up associations...');
ColumnConstraint.belongsTo(Column, { foreignKey: 'clm_id' });
Column.hasMany(ColumnConstraint, { foreignKey: 'clm_id', as: 'constraints' });
ColumnConstraint.belongsTo(Constraint, { foreignKey: 'constraint_id' });
Constraint.hasMany(ColumnConstraint, { foreignKey: 'constraint_id' });

Widget.belongsTo(DataTable, {
    foreignKey: 'dataset',
});

Widget.belongsTo(Project, {
    foreignKey: 'project_id',
});

Widget.hasMany(ChartWidget, {
    foreignKey: 'widget_id',
});

Widget.hasMany(ParameterTableWidget, {
    foreignKey: 'widget_id',
});

Widget.hasMany(ToggleWidget, {
    foreignKey: 'widget_id',
});

Widget.hasMany(GaugeWidget, {
    foreignKey: 'widget_id',
});

ChartWidget.belongsTo(Widget, {
    foreignKey: 'widget_id',
});

ChartWidget.belongsTo(Column, {
    foreignKey: 'x_axis',
});

ChartSeries.belongsTo(ChartWidget, {
    foreignKey: 'chart_id',
});

ChartWidget.hasMany(ChartSeries, {
    foreignKey: 'chart_id',
});

ChartSeries.belongsTo(Column, {
    foreignKey: 'clm_id',
});

ChartSeries.belongsTo(Device, {
    foreignKey: 'device_id',
});

ParameterTableWidget.belongsTo(Widget, {
    foreignKey: 'widget_id',
});

ParameterTableWidget.belongsTo(Column, {
    foreignKey: 'clm_id',
});

ParameterTableWidget.belongsTo(Device, {
    foreignKey: 'device_id',
});

ToggleWidget.belongsTo(Widget, {
    foreignKey: 'widget_id',
});

ToggleWidget.belongsTo(Column, {
    foreignKey: 'clm_id',
});

ToggleWidget.belongsTo(Device, {
    foreignKey: 'device_id',
});

GaugeWidget.belongsTo(Widget, {
    foreignKey: 'widget_id',
});

GaugeWidget.belongsTo(Column, {
    foreignKey: 'clm_id',
});

GaugeWidget.belongsTo(Device, {
    foreignKey: 'device_id',
});

