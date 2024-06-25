'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.ProductSold, {foreignKey: "invoiceId"})
    }
  }
  Invoice.init({
    invoice_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: { msg: "Invoice number already exist" },
      validate: {
        notNull: { msg: "Invoice number must not empty" },
        notEmpty: { msg: "Invoice number must not empty" }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Date must not empty" },
        notEmpty: { msg: "Date must not empty" }
      }
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Customer Name must not empty" },
        notEmpty: { msg: "Customer Name must not empty" }
      }
    },
    salesperson: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Salesperson Name must not empty" },
        notEmpty: { msg: "Salesperson Name must not empty" }
      }
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Payment Type must not empty" },
        notEmpty: { msg: "Payment Type must not empty" }
      }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Notes must not empty" },
        notEmpty: { msg: "Notes must not empty" }
      }
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};