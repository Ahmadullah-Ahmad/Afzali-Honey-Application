import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const branchModel = sequelize.define("branch", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا نام داخل کنید",
      },
    },
    unique: { name: "branchName", msg: "این نمائنده گی مجود است" },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا اردس داخل کنید",
      },
    },
    unique: {
      name: "branchLocation",
      msg: "این نماينده گی مجود است، شما نمی تواند دوباره اضافه کنید",
    },
  },
  phone: {
    type: DataTypes.STRING,
    unique: {
      name: "branchPhone",
      msg: "این شماره مجود است، شما نمی تواند دوباره اضافه کنید",
    },
  },
});

//changes all records to lowercase
branchModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default branchModel;
