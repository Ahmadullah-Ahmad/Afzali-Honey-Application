import { Op } from "sequelize";
import AppErorr from "./appError.js";
import catchAsynC from "./catchAsynC.js";
import sequelize from "./Database.js";

export default (message) =>
  catchAsynC(async (req, res, next) => {
    if (!req.branch.id) {
      next(new AppErorr("شما اجازه ندارید که این جنس را به فروش برسانید", 403));
      return;
    }

    // handle product
    const transaction = await sequelize.transaction(async (tran) => {
      let productId;
      let customer;
      let product;
      product = await req.branch.getProduct(
        {
          where: {
            [Op.and]: [
              { name: req.body.productName },
              { type: req.body.productType },
            ],
          },
        },
        { transaction: tran }
      );

      if (product.length === 0) {
        product = await req.branch.createProduct(
          {
            name: req.body.productName,
            type: req.body.productType,
            quantity: req.body.quantity,
            price: req.body.price,
          },
          { transaction: tran }
        );
        productId = product.id;
      } else {
        product = product.at(0);
        productId = product.id;
      }

      //handle customer
      customer = await req.branch.getCustomer(
        {
          where: {
            [Op.and]: [
              { name: req.body.customerName },
              { phone: req.body.phone },
            ],
          },
        },
        { transaction: tran }
      );

      if (customer.length === 0) {
        customer = await req.branch.createCustomer(
          {
            name: req.body.customerName,
            phone: req.body.phone,
          },
          { transaction: tran }
        );
      } else {
        customer = customer?.at(0);
      }
      return { customer, product };
    });
    const { customer, product } = transaction;

    req.body.customerId = customer.id;
    req.productPreviousQuantity = product.quantity;
    req.body.productId = product.id;

    next();
  });
