const pagination = (req, res, next) => {
  const perPage = 20;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || perPage;
  const skip = (page - 1) * limit;
  req.pagination = {
    page,
    limit,
    skip,
  };
  next();
};

module.exports = pagination;
