import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../utils/Database.js";

const purchaseModel = sequelize.define("purchase", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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
        msg: "لطفا قمیت داخل کنید",
      },
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا ادرس داخل کنید",
      },
    },
  },
  pay: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

purchaseModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default purchaseModel;
