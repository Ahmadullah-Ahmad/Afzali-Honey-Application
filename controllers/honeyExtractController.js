import HoneyExtraction from "../models/honeyExtract.js";
import Product from "../models/product.js";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";
import sequelize from "../utils/Database.js";
export const HoneyMiddleware = (message) =>
  catchAsynC(async (req, res, next) => {
    if (!req.body.keepId) {
      return next(
        new AppErorr(
          `شما نمی توانید که معلومات وابسته به ${message} اول اضافه کیند.`,
          404
        )
      );
    }

    const honey = await req.branch.getBeeSave({
      where: { id: req.body.keepId },
    });
    if (honey.length === 0) {
      return next(
        new AppErorr("این تاریخ پیدا نه شود، اول اضافه کنید باز کوشش کنید", 404)
      );
    }
    const save = honey?.at(0);
    req.save = save;
    next();
  });

export const addHoney = catchAsynC(async (req, res, next) => {
  if (!req.body.type || !req.body.productId) {
    return next(new AppErorr("لطفا نوع را انتخاب کنید", 404));
  }
  const ExtractHoney = await sequelize.transaction(async (tran) => {
    const getProduct = await req.branch.getProduct(
      {
        where: { type: req.body.type, id: req.body.productId },
      },
      {
        transaction: tran,
      }
    );

    if (getProduct.length === 0) {
      next(
        new AppErorr("این جنس پیدا نه شود، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }

    const LastProduct = getProduct?.at(0);

    await Product.update(
      {
        quantity: LastProduct.quantity + req.body.amount * 1,
      },
      { where: { id: LastProduct.id } },
      { transaction: tran }
    );

    return await req.save.createExtract({
      amount: req.body.amount,
      branchId: req.branch.id,
      productId: LastProduct.id,
    });
  });

  res.status(200).json({
    status: "success",
    amount: ExtractHoney,
  });
});

export const getHoney = catchAsynC(async (req, res, next) => {
  const ExtractHoney = await req.save.getExtract();
  res.status(200).json({
    status: "success",
    ExtractHoney,
  });
});

export const getOneHoney = catchAsynC(async (req, res, next) => {
  const ExtractHoney = await req.save.getExtract({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    ExtractHoney: ExtractHoney[0],
  });
});

export const updateHoney = catchAsynC(async (req, res, next) => {
  if (!req.body.type || !req.body.productId) {
    return next(new AppErorr("لطفا نوع را انتخاب کنید", 404));
  }
  const ExtractHoney = await sequelize.transaction(async (tran) => {
    const getProduct = await req.branch.getProduct(
      {
        where: { type: req.body.type, id: req.body.productId },
      },
      {
        transaction: tran,
      }
    );

    if (getProduct.length === 0) {
      next(
        new AppErorr("این جنس پیدا نه شود، اول اضافه کنید باز کوشش کنید", 404)
      );
      return;
    }
    const LastProduct = getProduct?.at(0);

    const extracthoney = await req.save.getExtract({
      where: { id: req.body.id },
    });

    const extrected = extracthoney?.at(0);

    await Product.update(
      {
        quantity: LastProduct.quantity - extrected.amount,
      },
      { where: { id: LastProduct.id } },
      { transaction: tran }
    );

    const secondProduct = await Product.findOne(
      {
        where: { type: req.body.type, id: req.body.productId },
      },
      {
        transaction: tran,
      }
    );

    await Product.update(
      {
        quantity: secondProduct.quantity + req.body.amount * 1,
      },
      { where: { id: secondProduct.id } },
      { transaction: tran }
    );

    const second = await Product.findOne(
      {
        where: { type: req.body.type, id: req.body.productId },
      },
      {
        transaction: tran,
      }
    );

    return await HoneyExtraction.update(req.body, {
      where: { id: req.body.id },
    });
  });

  res.status(200).json({
    status: "success",
    amount: ExtractHoney,
  });
});

export const deleteHoney = catchAsynC(async (req, res, next) => {
  const deleteExtract = await sequelize.transaction(async (tran) => {
    const ExtractHoney = await HoneyExtraction.findOne(
      {
        where: { id: req.params.id },
      },
      { transaction: tran }
    );

    if (!ExtractHoney) {
      return next(
        new AppErorr("معلومات پیدا نه شود، اول اضافه کنید باز کوشش کنید", 404)
      );
    }

    const product = await Product.findOne(
      {
        where: { id: ExtractHoney.productId },
      },
      {
        transaction: tran,
      }
    );

    await Product.update(
      {
        quantity: product.quantity - ExtractHoney.amount,
      },
      { where: { id: product.id } },
      { transaction: tran }
    );

    return await HoneyExtraction.destroy(
      {
        where: { id: req.params.id },
      },
      { transaction: tran }
    );
  });
  res.status(200).json({
    status: "success",
  });
});
