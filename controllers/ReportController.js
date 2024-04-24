import Product from "../models/product.js";
import catchAsynC from "../utils/catchAsynC.js";
import branchModel from "../models/branch.js";
import { Op } from "sequelize";

export const getSalesForReport = catchAsynC(async (req, res, next) => {
  //filtering
  const startDate = new Date(req.query.start);
  const endDate = new Date(Date.now());
  const type = req.query.type || "sales";
  // console.log(new Date(startDate));
  const where = {
    where: { createdAt: { [Op.between]: [startDate, endDate] } },
  };

  let data;
  if (type === "sales") {
    data = await req.branch.getSales({
      ...where,
      // attributes: ["id", "discount", "quantity", "price", "createdAt"],
      include: [
        {
          model: Product,
          right: true,
          as: "product",
          // attributes: ["id", "name"],
        },

        { model: branchModel, as: "branch", right: true, attributes: ["id"] },
      ],
    });
  }
  if (type === "purchase") {
    data = await req.branch.getPurchase({
      ...where,
      attributes: ["id", "quantity", "price", "createdAt", "pay"],
      include: [
        {
          model: Product,
          right: true,
          as: "product",
          attributes: ["id", "name"],
        },

        { model: branchModel, as: "branch", right: true, attributes: ["id"] },
      ],
    });
  }
  if (type === "spend") {
    data = await req.branch.getSpend({ ...where });
  }
  res.status(200).json({
    status: "success",
    type,
    data,
    count: data?.length,
  });
});
