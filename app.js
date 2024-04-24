import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import errorControler from "./controllers/errorControler.js";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

// 'express-rate-limit'
// 'xss-clean'
// 'body-parser'
// import Routers
import userRouter from "./routers/userRouter.js";
import branchRouter from "./routers/branchRouter.js";
import spnedRouter from "./routers/spendsRouter.js";
import productRoute from "./routers/productRoute.js";
import saveBeeRouter from "./routers/saveBeeRouter.js";
import honeyExtractRoute from "./routers/honeyExtractRoute.js";
import HoneyFoodRouter from "./routers/HoneyFoodRouter.js";
import salesRoute from "./routers/salesRoute.js";
import purchaseRoute from "./routers/purchaseRoute.js";
import customerRoute from "./routers/customerRoute.js";
import dashboardRoutes from "./routers/dashboardRoutes.js";
import ReportRouter from "./routers/ReportRouter.js";
import advertisRoute from "./routers/advertisRoute.js";

//import Models
import userModel from "./models/user.js";
import branchModel from "./models/branch.js";
import spendModel from "./models/expenditurs.js";
import productModel from "./models/product.js";
import saveBeeModel from "./models/beeSave.js";
import honeyExtractModel from "./models/honeyExtract.js";
import honeyFoodModel from "./models/food.js";
import customerModel from "./models/customer.js";
import salesModel from "./models/sales.js";
import purchaseModel from "./models/purchase.js";

const app = express();
app.use(express.json());
app.use(compression());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

const currentModulePath = fileURLToPath(import.meta.url);
const currentDirPath = dirname(currentModulePath);

app.use(express.static(join(currentDirPath, "public/image/products")));
app.use(express.static(join(currentDirPath, "public/image/users")));

// Association
//branch association with user
branchModel.hasMany(userModel, { as: "User" });
userModel.belongsTo(branchModel, {
  as: "branch",
  constraints: true,
  onDelete: "CASCADE",
});

//branch association with expenditures
branchModel.hasMany(spendModel, { as: "Spend" });
spendModel.belongsTo(branchModel, { as: "branch" });

//branch association with product
branchModel.hasMany(productModel, { as: "Product" });
productModel.belongsTo(branchModel, { as: "branch" });

//branch association with saveBee info
branchModel.hasMany(saveBeeModel, { as: "BeeSave" });
saveBeeModel.belongsTo(branchModel, { as: "branch" });

//savehoney association with honeyExtraction and branch is automatically associated with honeyExtraction
saveBeeModel.hasMany(honeyExtractModel, { as: "Extract" });
honeyExtractModel.belongsTo(branchModel, { as: "branch" });

productModel.hasMany(honeyExtractModel, { as: "Extract" });
honeyExtractModel.belongsTo(productModel, { as: "product" });

//savehoney association with honeyFood and branch is automatically associated with honeyFood
saveBeeModel.hasMany(honeyFoodModel, { as: "Food" });
honeyFoodModel.belongsTo(branchModel, { as: "branch" });

//branch association with customer info
branchModel.hasMany(customerModel, { as: "Customer" });
customerModel.belongsTo(branchModel, { as: "branch" });

//branch association with sales info
branchModel.hasMany(salesModel, { as: "Sales" });
salesModel.belongsTo(branchModel, { as: "branch" });

//customer association with sales info
customerModel.hasMany(salesModel, { as: "Sales" });
salesModel.belongsTo(customerModel, {
  foriegnKey: "customerId",
  as: "customer",
});

//product association with sales info
productModel.hasMany(salesModel, { as: "Sales", foriegnKey: "productId" });
salesModel.belongsTo(productModel, { foriegnKey: "productId", as: "product" });

//branch association with sales info
branchModel.hasMany(purchaseModel, { as: "purchase" });
purchaseModel.belongsTo(branchModel, { as: "branch" });

//customer association with sales info
customerModel.hasMany(purchaseModel, { as: "purchase" });
purchaseModel.belongsTo(customerModel, {
  foriegnKey: "customerId",
  as: "customer",
});

//product association with sales info
productModel.hasMany(purchaseModel, {
  as: "purchase",
  foriegnKey: "productId",
});
purchaseModel.belongsTo(productModel, {
  foriegnKey: "productId",
  as: "product",
});

// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/spend", spnedRouter);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/save", saveBeeRouter);
app.use("/api/v1/extracthoney", honeyExtractRoute);
app.use("/api/v1/honeyfood", HoneyFoodRouter);
app.use("/api/v1/sales", salesRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/report", ReportRouter);
app.use("/api/v1/advertisment", advertisRoute);

app.use(errorControler);
export default app;
