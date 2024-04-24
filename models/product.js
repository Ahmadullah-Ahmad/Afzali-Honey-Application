import { DataTypes } from "sequelize";
import sequelize from "../utils/Database.js";
import Branch from "./branch.js";
const productModel = sequelize.define(
  "product",
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
      unique: {
        name: "productName",
        msg: "این جنس باید یگانه باشد",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "لطفا نوع داخل کنید",
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "لطفا مقدار داخل کنید",
        },
      },
    },
    salePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: {
          msg: "لطفا قمیت فروش داخل کنید",
        },
      },
    },
    buyPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          msg: "لطفا قیمت خریداری داخل کنید",
        },
      },
    },
    advantage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          msg: "لطفا فصیده مفاد داخل کنید",
        },
      },
    },
    photo: { type: DataTypes.STRING, defaultValue: "No Image" },
    branchId: {
      type: DataTypes.INTEGER,
      references: {
        model: Branch,
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "The product is avialabile",
    },
  },
  {
    primaryKey: true,
    uniqueKeys: {
      nameAndBranch: {
        fields: ["name", "branchId"],
        msg: "این جنس مجود است در این نماېنده گی",
      },
    },
  }
);

productModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export default productModel;
