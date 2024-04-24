import multer from "multer";
import sharp from "sharp";
import User from "../models/user.js";
import Branch from "../models/branch.js";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";
import { DeleteOne, GetAll, GetOne, UpdateOne } from "./factoryHandler.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppErorr("لطفا عکس را انتفال کنید", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const resizeUserPhoto = catchAsynC(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/users/${req.file.filename}`);

  next();
});

export const uploadUserPhoto = upload.single("photo");

const filterObj = (obj, ...allowfeilds) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowfeilds.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const createUser = catchAsynC(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
    photo: req.body.photo,
    branchId: req.body.branchId,
  });
  res.status(200).json({
    status: "success",
    user,
  });
});

export const updateMe = catchAsynC(async (req, res, next) => {
  // if password exist
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppErorr("از این طریقه شما نمی تواند پسورد خوده تعغیر کنید", 400)
    );
  }
  // filter unwanted feids
  const allowfeilds = filterObj(req.body, "name", "username");

  // add photo
  if (req.file) allowfeilds.photo = req.file.filename;
  const updateMe = await User.update(allowfeilds, {
    where: { id: req.user.id },
  });

  res.status(200).json({
    status: "success",
    result: updateMe,
  });
});

export const getMe = catchAsynC(async (req, res, next) => {
  const doc = await User.findOne({
    where: { id: req.user.id },
    include: {
      model: Branch,
      as: "branch",
      attributes: ["id", "name"],
    },
  });
  const user = JSON.parse(JSON.stringify(doc));
  const { password, ...userWithOutPassword } = user;
  res.status(200).json({
    status: "success",
    doc: userWithOutPassword,
  });
});

export const deleteUser = DeleteOne(User);
export const getOne = GetOne(User);
export const updateUser = UpdateOne(User);
export const getAll = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 6;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  const doc = await User.findAll({
    limit: limit,
    offset: skip,
    include: {
      model: Branch,
      as: "branch",
      attributes: ["id", "name", "location", "createdAt"],
    },
  });
  const length = await User.findAll();
  res.status(200).json({
    status: "success",
    doc,
    count: length.length,
  });
});
