const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class TimeTable extends BaseModel {
  static init() {
    return super.init(
      {
        roomId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        dayOfWeek: {
          type: DataTypes.ENUM(
            'MONDAY',
            'TUESDAY',
            'WEDNESDAY',
            'THURSDAY',
            'FRIDAY',
            'SATURDAY',
            'SUNDAY'
          ),
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        isRecurring: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
        eventName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'timetables',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
    });
  }
}

module.exports = TimeTable;
