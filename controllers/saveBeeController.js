import BeeSave from "../models/beeSave.js";
import Product from "../models/product.js";
import catchAsynC from "../utils/catchAsynC.js";
import Food from "../models/food.js";
import branchModel from "../models/branch.js";
import HoneyExtract from "../models/honeyExtract.js";
import {
  createWithForiegnKey,
  DeleteByForiegnKey,
  updateByForiegnKey,
} from "./factoryHandler.js";
import { Op } from "sequelize";
const associationName = "BeeSave";

export const addBeeSave = createWithForiegnKey(BeeSave, associationName);
export const updateBeeSave = updateByForiegnKey(BeeSave, associationName);
export const deleteBeeSave = DeleteByForiegnKey(BeeSave, associationName);

export const getOneBeeSave = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 8;
  const page = req.query.page * 1 || 8;
  const skip = (page - 1) * limit;
  const branchBeeSave = await req.branch.getBeeSave({
    where: { id: req.params.id },
    include: [
      {
        model: Food,
        as: "Food",
        attributes: ["id", "name", "price", "quantity", "createdAt"],
        limit: limit,
        offset: skip,
      },
      {
        model: HoneyExtract,
        as: "Extract",
        attributes: ["id", "amount", "createdAt"],
        limit: limit,
        offset: skip,
        include: [
          { model: Product, as: "product", attributes: ["id", "type"] },
        ],
      },
      { model: branchModel, as: "branch", attributes: ["id"] },
    ],
  });

  const length = await req.branch.getBeeSave();
  res.status(200).json({
    status: "success",
    length: length.length,
    branchBeeSave: branchBeeSave?.at(0),
  });
});
export const getAllBeeSave = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 7;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  const where = {};
  if (req.query.search !== "null") {
    const endDate = new Date(Date.now()).toISOString();
    const startDate = new Date(req.query.search).toISOString();
    where.createdAt = {
      [Op.between]: [startDate, endDate],
    };
  }

  const branchBeeSave = await req.branch.getBeeSave({
    limit: limit,
    offset: skip,
    where: where,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Food,
        as: "Food",
        attributes: ["id", "price", "quantity"],
      },
      {
        model: HoneyExtract,
        as: "Extract",
        attributes: ["id", "amount"],
      },
      { model: branchModel, as: "branch", attributes: ["id"] },
    ],
  });

  const length = await req.branch.getBeeSave({
    where: where,
  });
  res.status(200).json({
    status: "success",
    length: length.length,
    branchBeeSave,
  });
});
