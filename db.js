const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('iot-on-earth', 'datacanvasAdmin','2215476LKRa', {
  host: 'datacanvas-postgresql.postgres.database.azure.com',
  port: 5432,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    encrypt: true,
  },

});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
