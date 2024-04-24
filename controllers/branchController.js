import Branch from "../models/branch.js";
import Product from "../models/product.js";
import catchAsynC from "../utils/catchAsynC.js";
import { AddOne, DeleteOne, UpdateOne } from "./factoryHandler.js";
export const createBranch = AddOne(Branch);
export const updateBranch = UpdateOne(Branch);
export const deleteBranch = DeleteOne(Branch);
export const getAllBranch = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  const doc = await Branch.findAll({
    limit: limit,
    offset: skip,
    include: {
      model: Product,
      as: "Product",
      attributes: ["id", "quantity", "salePrice"],
    },
  });
  const length = await Branch.findAll();
  res.status(200).json({
    status: "success",
    doc,
    count: length.length,
  });
});

export const getInfo = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 6;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  const doc = await Branch.findAll({
    limit: limit,
    offset: skip,
    attributes: ["id", "name", "location", "phone"],
  });
  const length = await Branch.findAll();
  res.status(200).json({
    status: "success",
    doc,
    count: length.length,
  });
});
