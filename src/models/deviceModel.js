const {DataTypes,Model} = require('sequelize');
const sequelize = require ('./../../db');
const Project = require('./projectModel');

class Device extends Model{}

Device.init({
    device_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        AutoIncrement: true
    },

    device_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    fingerprint:{
        type: DataTypes.STRING,
        allowNull:false
    },

    project_id: {
        type: DataTypes.INTEGER,
        References:{
            Model:Project,
            key: 'project_id'
        }
    }
},{
    sequelize,
    modelName: 'Device',
    schema: 'iot-on-earth-public',
    tableName: 'device',
    timestamps: true,
    underscored: true
}
   
);
module.exports = Device;