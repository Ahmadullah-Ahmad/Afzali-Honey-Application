import Product from "../models/product.js";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";
import customerModel from "../models/customer.js";
import branchModel from "../models/branch.js";
import Sales from "../models/sales.js";
import sequelize from "../utils/Database.js";

export const addSale = catchAsynC(async (req, res, next) => {
  if (!req.branch.id) {
    next(new AppErorr("شما اجازه ندارید که این جنس را به فروش برسانید", 403));
    return;
  }
  const sale = await sequelize.transaction(async (tran) => {
    const product = await Product.findByPk(req.body.productId, {
      transaction: tran,
    });
    req.body.orignalPrice = product.salePrice;

    await Product.update(
      {
        quantity: product.quantity - req.body.quantity,
      },
      { where: { id: product.id } },
      { transaction: tran }
    );

    return await req.branch.createSale(req.body, { transaction: tran });
  });
  res.status(200).json({
    status: "success",
    sale,
  });
});

export const updateSales = catchAsynC(async (req, res, next) => {
  const sale = await sequelize.transaction(async (tran) => {
    const getSale = await req.branch.getSales({
      where: { id: req.params.id },
    });
    if (getSale.length === 0) {
      next(
        new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }
    const LastSale = getSale?.at(0);

    const product = await Product.findByPk(LastSale.productId, {
      transaction: tran,
    });

    await Product.update(
      {
        quantity: product.quantity + LastSale.quantity,
      },
      { where: { id: LastSale.productId } },
      { transaction: tran }
    );

    const product1 = await Product.findOne(
      { where: { id: req.body.productId } },
      {
        transaction: tran,
      }
    );
    await Product.update(
      {
        quantity: product1.quantity - req.body.quantity,
      },
      { where: { id: product1.id } },
      { transaction: tran }
    );
    req.body.orignalPrice = product1.salePrice;
    return await Sales.update(
      req.body,
      { where: { id: req.params.id } },
      { transaction: tran }
    );
  });
  res.status(200).json({
    status: "success",
    sale,
  });
});

export const getOneSales = catchAsynC(async (req, res, next) => {
  const branchSale = await req.branch.getSales({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        right: true,
        as: "product",
        attributes: ["id", "name", "salePrice"],
      },
      {
        model: customerModel,
        as: "customer",
        attributes: ["id", "name", "phone"],
      },
      {
        model: branchModel,
        as: "branch",
        right: true,
        attributes: ["id"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    sale: branchSale[0] ? branchSale.at(0) : null,
  });
});

export const deleteSale = catchAsynC(async (req, res, next) => {
  const saleDelete = await sequelize.transaction(async (tran) => {
    const branchSale = await req.branch.getSales(
      {
        where: { id: req.params.id },
      },
      { transaction: tran }
    );
    if (branchSale.length === 0) {
      next(
        new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }

    const sale = branchSale?.at(0);
    let product = await Product.findByPk(sale.productId, {
      transaction: tran,
    });
    const update = await Product.update(
      {
        quantity: product.quantity + sale.quantity,
      },
      { where: { id: sale.productId } },
      { transaction: tran }
    );
    return await Sales.destroy({
      where: { id: req.params.id },
      transaction: tran,
    });
  });
  res.status(200).json({
    status: "success",
    sale: saleDelete,
  });
});

export const getAllSales = catchAsynC(async (req, res, next) => {
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

  const [feild, direction] = sort?.split("-");
  if (sort) {
    options.order.push([feild, direction]);
  }
  // filtering
  const type = req.query.type === "null" ? undefined : req.query.type;

  const ProductAssociation = {
    model: Product,
    right: true,
    as: "product",
    attributes: ["id", "name", "salePrice"],
  };

  if (type) {
    const where = {};
    where.type = type;
    ProductAssociation.where = where;
  }

  const branchSales = await req.branch.getSales({
    ...options,
    include: [
      { ...ProductAssociation },
      {
        model: Product,
        right: true,
        as: "product",
        attributes: ["id", "name", "salePrice"],
      },
      {
        model: customerModel,
        as: "customer",
        attributes: ["id", "name", "phone"],
      },
      { model: branchModel, as: "branch", right: true, attributes: ["id"] },
    ],
  });

  const length = await req.branch.getSales({
    include: [ProductAssociation],
  });

  res.status(200).json({
    status: "success",
    length: length?.length,
    branchSales,
  });
});
