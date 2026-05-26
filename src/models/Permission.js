const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class Permission extends BaseModel {
  static init() {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        resource: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        action: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'permissions',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Role, {
      through: models.RolePermission,
      as: 'roles',
    });
  }
}

module.exports = Permission;
