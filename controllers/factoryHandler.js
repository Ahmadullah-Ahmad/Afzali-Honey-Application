import catchAsynC from "../utils/catchAsynC.js";
import AppErorr from "../utils/appError.js";

export const AddOne = (model) =>
  catchAsynC(async (req, res, next) => {
    if (!model) next(new AppErorr("Table is not exist", 404));
    const doc = await model.create(req.body);

    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const GetAll = (model) =>
  catchAsynC(async (req, res, next) => {
    const doc = await model.findAll();
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const GetOne = (model) =>
  catchAsynC(async (req, res, next) => {
    const doc = await model.findOne({ where: { id: req.params.id } });
    doc.password = undefined;
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const DeleteOne = (model) =>
  catchAsynC(async (req, res, next) => {
    const doc = await model.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const UpdateOne = (model) =>
  catchAsynC(async (req, res, next) => {
    const doc = await model.update(req.body, { where: { id: req.params.id } });

    res.status(200).json({
      status: "success",
      doc: doc[0],
    });
  });

//eval(`req.user.get${value}()`);
export const createWithForiegnKey = (model, key) =>
  catchAsynC(async (req, res, next) => {
    if (!model) next(new AppErorr("Table is not exist", 404));
    const doc = await eval(`req.branch.create${key}(req.body)`);
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const GetAllByForiegnKey = (model, key) =>
  catchAsynC(async (req, res, next) => {
    const limit = req.query.limit * 1 || 8;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;

    const doc = await eval(
      `req.branch.get${key}({${
        req.query.page ? `limit:${limit},offset:${skip}` : ""
      }
      })`
    );
    const doc1 = await eval(`req.branch.get${key}()`);

    res.status(200).json({
      status: "success",
      count: doc1.length,
      doc,
    });
  });
export const GetOneByForiegnKey = (model, key) =>
  catchAsynC(async (req, res, next) => {
    const doc = await eval(`req.branch.get${key}({where:{id:req.params.id}})`);

    res.status(200).json({
      status: "success",
      doc: doc.length !== 0 ? doc?.at(0) : "معلومات پیدا نه شود",
    });
  });
export const updateByForiegnKey = (model, key) =>
  catchAsynC(async (req, res, next) => {
    //getting data by association
    const instance = await eval(
      `req.branch.get${key}({where:{id:req.params.id}})`
    );
    if (instance.length === 0) {
      next(new AppErorr("معلومات پیدا نه شد، دوباره کوشش کنید", 404));
      return;
    }
    //updating by model information
    const doc = await model.update(req.body, {
      where: { id: instance?.at(0)?.id },
    });
    res.status(200).json({
      status: "success",
      doc,
    });
  });

export const DeleteByForiegnKey = (model, key) =>
  catchAsynC(async (req, res, next) => {
    //getting data by association
    const instance = await eval(
      `req.branch.get${key}({where:{id:req.params.id}})`
    );
    if (instance.length === 0) {
      return next(
        new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404)
      );
    }
    //delete by model information
    const doc = await model.destroy({
      where: { id: instance.at(0).id },
    });
    res.status(200).json({
      status: "success",
      doc,
    });
  });
