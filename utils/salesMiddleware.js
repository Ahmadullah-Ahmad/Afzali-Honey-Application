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
    if (!req.body.product || !req.body.customerName) {
      next(
        new AppErorr(
          "اشتباه جنس  ${message} ، لطفا جنس رانتخاب کنید یا معلوما ت مشتری را بنوسید ",
          403
        )
      );

      return;
    }
    const { customerId, productId } = await sequelize.transaction(
      async (tran) => {
        const product = await req.branch.getProduct(
          {
            where: { name: req.body.product },
          },
          { transaction: tran }
        );
        if (product.length === 0) {
          next(
            new AppErorr(
              "این جنس پیدا نه شود، اول اضافه کنید باز کوشش کنید",
              404
            )
          );
          return;
        }
        const productId = product.at(0).id;

        let customer;
        let customerId;

        customer = await req.branch.getCustomer({
          where: {
            [Op.and]: [
              { name: req.body.customerName },
              { phone: req.body.phone || null },
            ],
          },
          transaction: tran,
        });

        if (customer.length === 0 && req.body.phone) {
          customer = await req.branch.createCustomer(
            {
              name: req.body.customerName,
              phone: req.body.phone,
            },
            { transaction: tran }
          );
          customerId = customer.id;
        } else {
          customerId = customer?.at(0)?.id;
        }
        return { customerId, productId };
      }
    );
    req.body.customerId = customerId;
    req.body.productId = productId;
    next();
  });
