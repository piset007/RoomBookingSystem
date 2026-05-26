const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * IEntity Interface (represented as comments in JS)
 * - id: UUID primary key
 * - createdAt: timestamp
 * - updatedAt: timestamp
 */
class BaseModel {
  static init(attributes = {}, options = {}) {
    const defaultAttributes = {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    };

    const mergedAttributes = { ...defaultAttributes, ...attributes };
    const mergedOptions = {
      sequelize,
      timestamps: true,
      underscored: false,
      ...options,
    };

    return super.init(mergedAttributes, mergedOptions);
  }

  // Helper methods
  toJSON() {
    return this.get({ plain: true });
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async findAll(options = {}) {
    return super.findAll(options);
  }
}

module.exports = BaseModel;
