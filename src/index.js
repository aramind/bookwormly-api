const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// routers
const authRouter = require("./routes/authRouter");
const app = express();

// env
dotenv.config();
const { PORT = 3001, MONGO_CONNECT: DB } = process.env;

// configs

const corsOptions = require("./lib/cors");
// middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use([helmet(), express.json()]);
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", authRouter);
// if not found
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Not found" })
);

const startServer = async () => {
  try {
    const connection = await mongoose.connect(DB);
    app.listen(PORT, () => console.log(`Server is listening to port ${PORT} `));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
