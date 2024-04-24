import Customer from "../models/customer.js";
import Sale from "../models/sales.js";
import Purchase from "../models/purchase.js";
import Product from "../models/product.js";

import catchAsynC from "../utils/catchAsynC.js";

import {
  createWithForiegnKey,
  DeleteByForiegnKey,
  DeleteOne,
} from "./factoryHandler.js";
import { Op } from "sequelize";

const associationName = "Customer";

export const addCustomer = createWithForiegnKey(Customer, associationName);
export const getAllCustomer = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 7;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const options = {
    limit: limit,
    offset: skip,
  };
  const search = req.query.search === "null" ? undefined : req.query.search;
  const borrow = req.query.borrower === "null" ? undefined : req.query.borrower;
  const borrower = {};
  const lenders = {};

  if (borrow) {
    if (borrow !== "lender") borrower.where = { pay: false };
    if (borrow === "lender") lenders.where = { pay: false };
  }

  if (search) {
    const where = {};

    where.name = {
      [Op.like]: `%${search}%`,
    };
    options.where = where;
  }
  const customer = await req.branch.getCustomer({
    ...options,
    include: [
      {
        model: Sale,
        as: "Sales",
        attributes: ["id", "quantity", "price", "pay"],
        ...borrower,
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "salePrice", "buyPrice"],
          },
        ],
      },
      {
        model: Purchase,
        as: "purchase",
        attributes: ["id", "quantity", "price", "pay"],
        ...lenders,
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  const length = await req.branch.getCustomer({
    include: [
      {
        model: Sale,
        as: "Sales",
        attributes: ["id", "quantity", "price", "pay"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: Purchase,
        as: "purchase",
        attributes: ["id", "quantity", "price", "pay"],
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    length: customer?.length,
    count: length,
    customer,
  });
});

export const getOneCustomer = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const customer = await Customer.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Sale,
        as: "Sales",
        attributes: ["id", "quantity", "price", "createdAt", "pay"],
        limit: limit,
        offset: skip,
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "name"],
            left: true,
          },
        ],
      },
      {
        model: Purchase,
        as: "purchase",
        attributes: ["id", "quantity", "createdAt", "price", "pay", "deadline"],
        limit: limit,
        offset: skip,
        left: true,
        include: [
          {
            model: Product,
            as: "product",
            attributes: ["id", "buyPrice", "name"],
            left: true,
          },
        ],
      },
    ],
  });
  const customerSale = await customer.getSales();
  const customerPurchase = await customer.getPurchase();
  const customerDetails = await Customer.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Sale,
        as: "Sales",
        attributes: ["id", "quantity", "price", "pay"],
      },
      {
        model: Purchase,
        as: "purchase",
        attributes: ["id", "quantity", "price", "pay"],

        left: true,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    sale: customerSale.length,
    purchase: customerPurchase.length,
    customer,
    customerDetails,
  });
});

export const updateCustomer = catchAsynC(async (req, res, next) => {
  const customer = await Customer.update(req.body, {
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    customer,
  });
});

export const deleteCustomer = DeleteOne(Customer);
