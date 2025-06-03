const cors = {
  origin: (origin, callback) => {
    if (
      process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1 ||
      !process.env.ALLOWED_ORIGINS
    ) {
      callback(null, true);
    } else {
      callback(new Error("NOT ALLOWED BY CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = cors;
