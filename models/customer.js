import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const customerModel = sequelize.define(
  "customer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "لطفا نام داخل کنید",
        },
      },
    },
    phone: { type: DataTypes.STRING },
  },
  {
    primaryKey: true,
    uniqueKeys: {
      compositeKey: {
        fields: ["name", "phone"],
      },
    },
  }
);

customerModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default customerModel;
