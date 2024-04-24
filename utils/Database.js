import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.ROLE,
  process.env.USER,
  {
    dialect: process.env.DBMS,
    host: process.env.HOST,
    logging: process.env.LOG === "true" ? true : false,
  }
);
export default sequelize;
