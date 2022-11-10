const { APIKey } = require("../config/config");

const authJwt = (req, res, next) => {
  let api = req.headers["x-api-key"];
  if (!api) {
    return res.status(403).send({
      message: "No API key provided!",
    });
  }
  if (api != APIKey) {
    return res.status(400).send({
      message: "Invalid API key provided!",
    });
  }
  next();
};

module.exports = authJwt;
