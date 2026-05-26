const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const BaseModel = require('./BaseModel');

class RolePermission extends BaseModel {
  static init() {
    return super.init(
      {
        roleId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        permissionId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'role_permissions',
        timestamps: true,
      }
    );
  }
}

module.exports = RolePermission;
