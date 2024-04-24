import AppErorr from "./appError.js";
import catchAsynC from "./catchAsynC.js";

export default (message) =>
  catchAsynC(async (req, res, next) => {
    const keepId = req.body.keepId || req.query.keepId;

    if (!keepId) {
      next(
        new AppErorr(
          `شما نمی توانید که معلومات وابسته به ${message} اول اضافه کیند.`,
          404
        )
      );
      return;
    }
    const honey = await req.branch.getBeeSave({
      where: { id: keepId },
    });
    if (honey.length === 0) {
      new AppErorr("این تاریخ پیدا نه شود، اول اضافه کنید باز کوشش کنید", 404);
      return;
    }
    const save = honey?.at(0);
    req.save = save;
    next();
  });
