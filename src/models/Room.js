const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');
const RoomStatus = require('../enums/RoomStatus');

class Room extends BaseModel {
  static init() {
    return super.init(
      {
        roomNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        location: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        building: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        floor: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(...RoomStatus.values()),
          defaultValue: RoomStatus.AVAILABLE,
        },
        amenities: {
          type: DataTypes.JSON,
          defaultValue: [],
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'rooms',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Booking, {
      foreignKey: 'roomId',
      as: 'bookings',
    });
    this.hasMany(models.TimeTable, {
      foreignKey: 'roomId',
      as: 'timeTables',
    });
  }
}

module.exports = Room;
