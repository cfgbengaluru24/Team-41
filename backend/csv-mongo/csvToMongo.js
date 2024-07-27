import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import "dotenv/config";
import { Students } from "../models/students";

const results = [];

fs.createReadStream("mockdata.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    const formattedResults = results.map((item) => ({
      firstName: item["First Name"],
      lastName: item["Last Name"],
      age: parseInt(item["Age"], 10),
      class: item["Class"],
      annualIncome: parseInt(item["Annual Income"], 10),
    }));

    Students.insertMany(formattedResults)
      .then((docs) => {
        console.log("Data inserted successfully:", docs);
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error("Error inserting data:", err);
        mongoose.connection.close();
      });
  });
