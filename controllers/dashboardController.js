import { Op } from "sequelize";
import catchAsynC from "../utils/catchAsynC.js";
import productModel from "../models/product.js";
import salesModel from "../models/sales.js";

export const countAllProduct = catchAsynC(async (req, res, next) => {
  const start = new Date(req.query.start);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(Date.now());
  end.setUTCHours(23, 59, 59, 999);
  const product = await req.branch.getProduct({
    attributes: ["id", "name", "quantity", "type"],
  });

  const boxes = await req.branch.getBeeSave({
    attributes: ["id", "boxes", "branchId"],
  });
  const purchase = await req.branch.getPurchase({
    where: {
      productId: { [Op.not]: null },
      createdAt: { [Op.between]: [start, end] },
    },
    attributes: ["id", "price", "quantity", "createdAt"],
  });
  const sales = await req.branch.getSales({
    where: {
      productId: { [Op.not]: null },
      createdAt: { [Op.between]: [start, end] },
    },
    attributes: [
      "id",
      "createdAt",
      "quantity",
      "discount",
      "price",
      "orignalPrice",
    ],
    include: [
      {
        model: productModel,
        as: "product",
        attributes: ["id", "buyPrice", "name", "salePrice"],
        left: true,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    product,
    purchase,
    boxes,
    sales,
  });
});
