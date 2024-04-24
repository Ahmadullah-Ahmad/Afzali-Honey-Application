import { Op } from "sequelize";
import Spend from "../models/expenditurs.js";
import catchAsynC from "../utils/catchAsynC.js";
import {
  createWithForiegnKey,
  DeleteByForiegnKey,
  GetOneByForiegnKey,
} from "./factoryHandler.js";
const associationName = "Spend";
export const addSpend = createWithForiegnKey(Spend, associationName);
export const GetOneSpend = GetOneByForiegnKey(Spend, associationName);
export const updateSpend = catchAsynC(async (req, res, next) => {
  //getting data by association
  const instance = await req.branch.getSpend({ where: { id: req.params.id } });
  if (instance.length === 0) {
    new AppErorr("معلومات پیدا نه شد،  لطفا معلومات صحیح داخل کنید", 404)
    return;
  }
  //updating by model information
  const doc = await Spend.update(req.body, {
    where: { id: instance?.at(0)?.id },
  });

  res.status(200).json({
    status: "success",
    doc,
  });
});
export const deleteSpend = DeleteByForiegnKey(Spend, associationName);

export const getAllSpend = catchAsynC(async (req, res, next) => {
  //pagination
  const limit = req.query.limit * 1 || 7;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const options = {
    order: [],
    limit: limit,
    offset: skip,
  };

  //sorting

  const sort = req.query.sort === "null" ? "id-asc" : req.query.sort;

  const [feild, direction] = sort.split("-");
  if (sort) {
    options.order.push([feild, direction]);
  }
  // filtering
  const type = req.query.get === "null" ? undefined : req.query.get;

  const filter = {};

  if (type) {
    const where = {};
    const endDate = new Date();
    const startDate = new Date(Date.now());
    startDate.setDate(startDate.getDate() - type);

    where.createdAt = {
      [Op.between]: [startDate, endDate],
    };
    options.where = where;
    filter.where = where;
  }
  const branchSpend = await req.branch.getSpend(options);
  const length = await req.branch.getSpend(filter);
  res.status(200).json({
    status: "success",
    length: length?.length,
    branchSpend,
  });
});
