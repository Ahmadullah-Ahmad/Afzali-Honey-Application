import HoneyFood from "../models/food.js";
import BeeSave from "../models/beeSave.js";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";

export const addFood = catchAsynC(async (req, res, next) => {
  const foodHoney = await req.save.createFood({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    branchId: req.branch.id,
  });

  res.status(200).json({
    status: "success",
    foodHoney,
  });
});

export const getFood = catchAsynC(async (req, res, next) => {
  const FoodHoney = await req.save.getFood();

  res.status(200).json({
    status: "success",
    Food: FoodHoney,
  });
});

export const getOneFood = catchAsynC(async (req, res, next) => {
  const FoodFood = await req.save.getFood({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    Food: FoodFood[0] ? FoodFood[0] : null,
  });
});

export const updateFood = catchAsynC(async (req, res, next) => {
  const FoodFood = await req.save.getFood({
    where: { id: req.params.id },
  });
  if (FoodFood.length === 0) {
    new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404);

    return;
  }
  const FoodUpdate = await HoneyFood.update(req.body, {
    where: { id: FoodFood.at(0).id },
  });
  res.status(200).json({
    status: "success",
    FoodUpdate,
  });
});

export const deleteFood = catchAsynC(async (req, res, next) => {
  const FoodFood = await req.save.getFood({
    where: { id: req.params.id },
  });
  if (FoodFood.length === 0) {
    new AppErorr("معلومات پیدا نه شد، اول اضافه کنید باز کوشش کنید", 404);

    return;
  }
  const FoodDelete = await HoneyFood.destroy({
    where: { id: FoodFood.at(0).id },
  });
  res.status(200).json({
    status: "success",
    FoodDelete,
  });
});
