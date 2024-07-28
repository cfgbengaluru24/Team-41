import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function VolunteerDash() {
  const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const csvUploadFn = (event) => {
    const file = event.target.files[0];
    const fileType = file.name.split(".").pop().toLowerCase();
    if (fileType !== "csv") {
      alert("Please upload a CSV file.");
      return;
    }
    Papa.parse(file, {
      complete: (result) => {
        setCsvData(result.data);
      },
      header: true,
    });
  };
  const conversionFn = () => {
    const res = JSON.stringify(csvData, null, 2);
    setJsonData(res);
  };

  return (
    <div>
      <input type="file" onChange={csvUploadFn} accept=".csv" />
      <h1 className="text-5xl">Welcome</h1>
      <h2 className="text-2xl">Rahul Yadav</h2>
      <div className="flex flex-wrap gap-10 ">
        {csvData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ item }) {
  console.log(item);
  return (
    <div className=" p-3 w-64 bg-pink-700 rounded-lg justify-between items-center">
      <div>
        <span className="text-2xl font-semibold text-blue-300">Name:</span>{" "}
        <span className="text-xl italic text-yellow-400">{item.Name}</span>
      </div>
      <div>
        <span className="text-2xl font-semibold text-blue-300">
          Annual Income:
        </span>{" "}
        <span className="text-xl italic text-yellow-400">
          {item.AnnualIncome}
        </span>
      </div>
      <div>
        <span className="text-2xl font-semibold text-blue-300">Class:</span>{" "}
        <span className="text-xl italic text-yellow-400">{item.Class}</span>
      </div>
      <div>
        <span className="text-2xl font-semibold text-blue-300">Gender:</span>{" "}
        <span className="text-xl italic text-yellow-400">{item.Gender}</span>
      </div>
      <button className="h-7 mt-2 w-fit flex items-center">Approve</button>
      <button className="h-7 w-20 bg-red-500 mt-3 flex items-center">
        Reject
      </button>
    </div>
  );
}
