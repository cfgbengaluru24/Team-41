import fs from "fs";
import csv from "csv-parser";

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

      const top6 = results.slice(0, 6);

      console.log(top3);

      return top6;
    });
}

export default csvToMongo;
