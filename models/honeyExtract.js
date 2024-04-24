import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const honeyExtractionModel = sequelize.define("honeyExtract", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا مقدار عسل داخل کنید",
      },
    },
  },
});

honeyExtractionModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default honeyExtractionModel;
