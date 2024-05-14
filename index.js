require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");

// connectDB();

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
