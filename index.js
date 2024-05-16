require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandling");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

connectDB();

app.use(bodyParser.json());

app.use("/api/auth/user", authRouter);
app.use("/api/user", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
