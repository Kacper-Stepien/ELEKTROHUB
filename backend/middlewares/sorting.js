const sorting = (req, res, next) => {
  const sort = req.query.sort;
  const availableSorts = [
    "name",
    "-name",
    "price",
    "-price",
    "averageRating",
    "-averageRating",
    "numberOfReviews",
    "-numberOfReviews",
  ];

  if (!sort || !availableSorts.includes(sort)) {
    req.sort = "name";
  } else {
    req.sort = sort;
  }
  next();
};

module.exports = sorting;
