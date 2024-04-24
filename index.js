import productModel from "./models/product.js";
import sequelize from "./utils/Database.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  console.log(`App running on port ${port}...`)
);

sequelize
  .sync()
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.log(err));

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
