import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const salesModel = sequelize.define("sale", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  discount: { type: DataTypes.INTEGER, defaultValue: 0 },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا مقدار داخل کنید",
      },
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا قیمت داخل کنید",
      },
    },
  },
  orignalPrice: { type: DataTypes.INTEGER },
  advantage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  pay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

salesModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default salesModel;
