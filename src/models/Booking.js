const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');
const BookingStatus = require('../enums/BookingStatus');

class Booking extends BaseModel {
  static init() {
    return super.init(
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        roomId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        purpose: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM(...BookingStatus.values()),
          defaultValue: BookingStatus.PENDING,
        },
        attendeeCount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        notes: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        approvedBy: {
          type: DataTypes.UUID,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'bookings',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    this.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
    });
  }
}

module.exports = Booking;
