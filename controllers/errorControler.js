import AppErorr from "../utils/appError.js";

const JsonWebTokenError = () => {
  return new AppErorr("شما به سیستم داخل نشد", 401);
};
const JsonWebTokenExpired = () => {
  return new AppErorr("لطفا به سیستم دوباره داخل شد", 401);
};

function SequelizeValidationError(err) {
  const error = err.message.split(":")[1];
  return new AppErorr(error, 400);
}

function SequelizeUniqueConstraintError(err) {
  let error;
  if (err.errors[0].path === "PRIMARY") {
    error = err.errors[0].message;
  }
  if (err.errors[0].path === "compositeKey") {
    error = "این معلومات موجود است";
  }
  if (err.message) return new AppErorr(error, 400);
}

function DevelopmentError(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
}

function ProductionError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
}
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  if (process.env.NODE_NOW === "development") {
    DevelopmentError(err, res);
  } else if (process.env.NODE_NOW === "production") {
    let error = { ...err, message: err.message };
    if (err.name === "JsonWebTokenError") {
      error = JsonWebTokenError();
    }
    if (err.name === "TokenExpiredError") {
      error = JsonWebTokenExpired();
    }
    if (err.name === "SequelizeValidationError") {
      error = SequelizeValidationError(err);
    }
    if (err.name === "SequelizeUniqueConstraintError") {
      error = SequelizeUniqueConstraintError(err);
    }
    ProductionError(error, res);
  }
};

//Error are two types in squelize : SequelizeDatabaseError,SequelizeValidationError
