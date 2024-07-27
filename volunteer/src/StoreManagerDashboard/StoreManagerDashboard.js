import axios from "axios";
import { useEffect, useState } from "react";

export default function StoreManager() {
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await axios.post(
          "http://localhost:5050/api/v1/storeManager/login",
          {
            email: "arya@gmail.com",
            password: "secret",
          }
        );
        setPendingList(res.data.storeManager.inventory.inventoryDetails);
        console.log(res.data.storeManager.inventory.inventoryDetails);
      } catch (err) {
        console.log(err);
      }
    }
    fetchInventory();
  }, []);

  return (
    <div>
      <h1 className="text-5xl">Welcome Store Manager,</h1>
      <div>
        <ul>
          {pendingList.map((item) =>
            !item.donatedStatus ? (
              <PendingCard item={item}> </PendingCard>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

function PendingCard({ item }) {
  return (
    <div className="w-1/2 mx-auto border-2 border-black p-3 rounded-lg">
      <div>
        <p className="capitalize text-xl font-bold">{item.clothType}</p>
        <p className="text-xl font-bold">
          Description:{" "}
          <span className=" italic font-normal text-red-600">
            {item.description}
          </span>
        </p>
        <p className="text-xl  italic">
          <span className="not-italic font-bold text-green-600">Size: </span>
          {item.size}
        </p>
        <button className="mt-3">Item has been donated</button>
      </div>
    </div>
  );
}
