import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";

const saveBeeModel = sequelize.define("BeeService", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  gardianName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا نام داخل کنید",
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

  rent: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا کرایه داخل کنید",
      },
    },
  },
  boxes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا تعدا صند داخل کنید",
      },
    },
  },
});

saveBeeModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});

export default saveBeeModel;
