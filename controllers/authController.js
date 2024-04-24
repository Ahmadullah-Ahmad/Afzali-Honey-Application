import { promisify } from "util";
import Jwt from "jsonwebtoken";
import AppErorr from "../utils/appError.js";
import catchAsynC from "../utils/catchAsynC.js";
import User, { correctPassword, ChangePassword } from "../models/user.js";
import branch from "../models/branch.js";

const generateToken = (id) =>
  Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ExpireIn,
  });

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

export const login = catchAsynC(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppErorr(" لطفا نام کاربرد و پسورد  داخل کنید", 404));
  }

  const user = await User.findOne({
    where: { username },
  });

  if (!user) {
    return next(
      new AppErorr(" لطفا نام کاربرد یا پسورد را صحیح داخل کنید", 401)
    );
  }

  const correct = await correctPassword(password, user.password);

  if (!correct) {
    return next(
      new AppErorr(" لطفا نام کاربرد  یا پسورد را صحیح داخل کنید", 401)
    );
  }
  sendToken(user, 200, res);
});

export const protectRoute = catchAsynC(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppErorr("شما به سیستم داخل نشد"), 401);
  }
  const decode = await promisify(Jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findByPk(decode.id);

  if (!freshUser) {
    return next(new AppErorr("لطفا به سیستم دوباره داخل شد", 401));
  }
  if (ChangePassword(decode.iat, freshUser)) {
    return next(
      new AppErorr("پسورد شما تعغیر کرده،لطفا به سیستم دوباره داخل شد", 401)
    );
  }

  const Branch = await branch.findOne({ where: { id: freshUser.branchId } });
  req.user = freshUser;
  req.branch = Branch;
  next();
});

export const restrictTo = (...roles) => {
  return catchAsynC(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppErorr("شما اجازه این کار ندارد", 403));
    }
    next();
  });
};

export const updatePassword = catchAsynC(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!(await correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppErorr("پسورد شما اشتباه است", 401));
  }
  const updateUser = await User.update(
    { password: req.body.password, confirmPassword: req.body.confirmPassword },
    { where: { id: user.id } }
  );

  sendToken(updateUser, 200, res);
});
