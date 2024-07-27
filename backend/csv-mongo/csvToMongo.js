import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import "dotenv/config";
import { Students } from "../models/students";

const results = [];

async function csvToMongo() {
  s.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.sort(
        (a, b) =>
          parseFloat(a["Annual Income"]) - parseFloat(b["Annual Income"])
      );

      const top3 = results.slice(0, 3);

      console.log(top3);

      const students = top3.map((item) => ({
        firstName: item["First Name"],
        lastName: item["Last Name"],
        age: parseInt(item["Age"], 10),
        class: item["Class"],
        annualIncome: parseInt(item["Annual Income"], 10),
      }));
      Students.insertMany(students)
        .then((docs) => {
          console.log("Data inserted successfully:", docs);
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error("Error inserting data:", err);
          mongoose.connection.close();
        });
    });
}

export default csvToMongo;
