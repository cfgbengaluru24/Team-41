import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";

// Replace with your MongoDB connection string
const mongoURI = "mongodb://localhost:27017/mydatabase";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
