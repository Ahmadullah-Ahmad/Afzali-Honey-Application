import multer from "multer";
import sharp from "sharp";
import Product from "../models/product.js";
import catchAsynC from "../utils/catchAsynC.js";
import { DeleteByForiegnKey, GetOneByForiegnKey } from "./factoryHandler.js";
const associationName = "Product";

const filterQuery = (sort) => {
  if (sort === "price") return "salePrice";
  if (sort === "buy") return "buyPrice";
  return sort;
};

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

export const resizeProductPhoto = catchAsynC(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `product-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(800, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/image/products/${req.file.filename}`);

  next();
});
export const uploadProductPhoto = upload.single("photo");

export const addProduct = catchAsynC(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  if (req.file) req.body.photo = req.file.filename;
  const doc = await req.branch.createProduct(req.body);

  res.status(200).json({
    status: "success",
    doc,
  });
});

export const updateProduct = catchAsynC(async (req, res, next) => {
  if (req.file) req.body.photo = req.file.filename;

  const doc = await req.branch.getProduct({ where: { id: req.params.id } });

  const updatedProduct = await Product.update(req.body, {
    where: { id: doc.at(0).id },
  });

  res.status(200).json({
    status: "success",
    updatedProduct,
  });
});

export const getCompleteProduct = catchAsynC(async (req, res, next) => {
  const doc = await req.branch.getProduct({
    attributes: ["id", "name", "branchId", "type"],
    order: [["id", "ASC"]],
  });

  res.status(200).json({
    status: "success",
    length: doc?.length,
    doc,
  });
});
export const getOneProduct = GetOneByForiegnKey(Product, associationName);
export const deleteProduct = DeleteByForiegnKey(Product, associationName);
export const getAllProduct = catchAsynC(async (req, res, next) => {
  //pagination
  const limit = req.query.limit * 1 || 8;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;

  const options = {
    order: [],
    limit: limit,
    offset: skip,
  };

  // filtering
  const type = req.query.type === "null" ? undefined : req.query.type;
  const filter = {};
  if (type) {
    const where = {};
    where.type = type;
    options.where = where;
    filter.where = where;
  }

  //sorting
  const sort = req.query.sort === "null" ? "id-asc" : req.query.sort;
  const [feild, direction] = sort.split("-");
  if (sort) {
    options.order.push([filterQuery(feild), direction]);
  }

  const doc = await req.branch.getProduct(options);
  const doc1 = await req.branch.getProduct(filter);

  res.status(200).json({
    status: "success",
    count: doc1.length,
    doc,
  });
});

export const getAdvetisments = catchAsynC(async (req, res, next) => {
  const limit = req.query.limit * 1 || 10;
  const page = req.query.page * 1 || 1;
  const skip = (page - 1) * limit;
  const product = await Product.findAll({
    attributes: ["id", "name", "salePrice", "photo"],
    limit: limit,
    offset: skip,
  });

  const length = await Product.findAll();
  res.status(200).json({
    status: "success",
    product,
    count: length?.length,
  });
});
export const getAdvetismentOne = catchAsynC(async (req, res, next) => {
  const product = await Product.findOne({
    attributes: ["id", "name", "photo", "salePrice", "description"],
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    product,
  });
});
