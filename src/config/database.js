const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'room_booking_system',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    sync: { alter: false }, // Set to true for development only
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('✓ Database connected successfully'))
  .catch((err) => console.error('✗ Database connection error:', err));

module.exports = sequelize;
