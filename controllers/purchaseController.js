import { Op } from "sequelize";
import Product from "../models/product.js";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";
import customerModel from "../models/customer.js";
import branchModel from "../models/branch.js";
import Purchase from "../models/purchase.js";
import sequelize from "../utils/Database.js";

export const addPurchase = catchAsynC(async (req, res, next) => {
  if (!req.branch.id) {
    next(
      new AppErorr("شما اجازه ندارید که این جنش را به خریداری برسانید", 403)
    );
    return;
  }
  const purchase = await sequelize.transaction(async (tran) => {
    await Product.update(
      {
        quantity: req.productPreviousQuantity + req.body.quantity,
        buyPrice: req.body.price,
      },
      { where: { id: req.body.productId } },
      { transaction: tran }
    );
    const purchase = await req.branch.createPurchase(req.body, {
      transaction: tran,
    });
    return purchase;
  });

  res.status(200).json({
    status: "success",
    purchase,
  });
});

export const updatePuchase = catchAsynC(async (req, res, next) => {
  const purchase = await sequelize.transaction(async (tran) => {
    const getpurchase = await req.branch.getPurchase(
      {
        where: { id: req.params.id },
      },
      { transaction: tran }
    );

    if (getpurchase.length === 0) {
      next(
        new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }
    const lastpurchase = getpurchase.at(0);

    await Product.update(
      {
        quantity: req.productPreviousQuantity - lastpurchase.quantity,
      },
      { where: { id: req.body.productId } },
      { transaction: tran }
    );

    let product = await Product.findByPk(req.body.productId, {
      transaction: tran,
    });

    await Product.update(
      {
        quantity: product.quantity + req.body.quantity,
      },
      { where: { id: product.id } },
      { transaction: tran }
    );

    return await Purchase.update(
      req.body,
      {
        where: { id: lastpurchase.id },
      },
      { transaction: tran }
    );
  });

  res.status(200).json({
    status: "success",
    purchase: purchase[0],
  });
});

export const getOnePurchase = catchAsynC(async (req, res, next) => {
  const branchSale = await req.branch.getPurchase({
    where: { id: req.params.id },
    include: [
      { model: Product, right: true, as: "product" },
      { model: customerModel, as: "customer" },
      { model: branchModel, as: "branch", right: true },
    ],
  });

  res.status(200).json({
    status: "success",
    sale: branchSale[0] ? branchSale.at(0) : null,
  });
});

export const deletePurchase = catchAsynC(async (req, res, next) => {
  const purchase = await sequelize.transaction(async (tran) => {
    const getpurchase = await req.branch.getPurchase(
      {
        where: { id: req.params.id },
      },
      { transaction: tran }
    );

    if (getpurchase.length === 0) {
      next(
        new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }
    const lastpurchase = getpurchase.at(0);

    let product = await Product.findByPk(lastpurchase.productId, {
      transaction: tran,
    });
    await Product.update(
      {
        quantity: product.quantity - lastpurchase.quantity,
      },
      { where: { id: lastpurchase.productId } },
      { transaction: tran }
    );
    return await Purchase.destroy(
      {
        where: { id: lastpurchase.id },
      },
      { transaction: tran }
    );
  });

  res.status(200).json({
    status: "success",
    purchase: purchase,
  });
});
export const getAllPurchase = catchAsynC(async (req, res, next) => {
  //pagination
  const limit = req.query.limit * 1 || 6;
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
  const type = req.query.type === "null" ? undefined : req.query.type;

  const ProductAssociation = {
    model: Product,
    right: true,
    as: "product",
    attributes: ["id", "name", "type"],
  };
  const filter = {};
  if (type) {
    const where = {};
    where.type = type;
    ProductAssociation.where = where;
    filter.where = where;
  }
  const branchPurchase = await req.branch.getPurchase({
    ...options,
    include: [
      {
        ...ProductAssociation,
      },
      {
        model: customerModel,
        as: "customer",
        attributes: ["id", "name", "phone"],
      },
      { model: branchModel, as: "branch", right: true },
    ],
  });
  const length = await req.branch.getPurchase({
    include: [ProductAssociation],
  });
  res.status(200).json({
    status: "success",
    length: length?.length,
    branchPurchase,
  });
});
