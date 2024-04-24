import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const expendModel = sequelize.define("spend", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  taker: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا نام گیرنده داخل کنید",
      },
    },
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا دلیل داخل کنید",
      },
    },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا مقدار داخل کنید",
      },
    },
  },
});
expendModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default expendModel;
