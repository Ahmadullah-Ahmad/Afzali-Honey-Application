import { DataTypes, Sequelize } from "sequelize";
import bycrpt from "bcrypt";
import sequelize from "../utils/Database.js";

const userModel = sequelize.define("user", {
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

  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا نام کاربرد داخل کنید",
      },
    },
    unique: {
      name: "username",
      msg: "این کاربرد مجود است، یکی دیگر امتحان کنید",
    },
    validate: { isEmail: { value: true, message: "Provide correct email" } },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      async chickPassword(value) {
        if (value === this.confirmPassword) {
          this.password = await bycrpt.hash(this.password, 12);
          return value;
        }
        throw new Error("ّّپسورد ها یکسان نیست");
      },
      notNull: {
        msg: "لطفا پسورد داخل کنید",
      },
    },
  },

  confirmPassword: {
    type: DataTypes.VIRTUAL,
    allowNull: false,
    validate: {
      notNull: {
        msg: "لطفا پسورد را دوباره داخل کنید",
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: {
        args: [["admin", "manager", "user"]],
        msg: "این اجازه مجود است",
      },
    },
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "default.jpg",
  },
  passwordChangAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now,
    allowNull: false,
  },
});
userModel.addHook("beforeValidate", (value) => {
  Object.keys(value.dataValues).forEach((key) => {
    if (typeof value[key] === "string") {
      value[key] = value[key].toLowerCase();
    }
  });
});
export const correctPassword = async (password, userPassword) => {
  return await bycrpt.compare(password, userPassword);
};

export const ChangePassword = (jwtTimestamp, model) => {
  if (!model && model?.passwordChangAt) {
    const changeTimestamp = parseInt(
      model.passwordChangAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changeTimestamp;
  }
  return false;
};
export default userModel;
