const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const sharp = require("sharp");

exports.resizePhotos = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  const { name } = req.body;

  const photos = [];
  await Promise.all(
    req.files.map(async (_, i) => {
      const fileName = `${name.replace(" ", "-")}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(req.files[i].buffer)
        .resize(1920, 1080)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${fileName}`);
      photos.push(fileName);
    })
  );

  req.body.photos = photos;

  next();
});
