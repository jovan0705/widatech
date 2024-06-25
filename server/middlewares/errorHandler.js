const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "EMPTY_PRODUCT":
      res.status(400).json({ message: `Product cannot be empty` });
      break;
    case "STOCK_NOT_AVAILABLE":
      res.status(400).json({ message: `Stock not Available for ${err.payload}` });
      break;

    default:
      res.status(500).json(err);
      break;
  }
};

module.exports = { errorHandler };
