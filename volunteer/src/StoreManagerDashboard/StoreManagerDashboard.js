import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StoreManager() {
  const [pendingList, setPendingList] = useState([]);
  const [show, setShow] = useState(false);

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

  async function updateDonateStatus(id) {
    try {
      await axios.patch(
        "http://localhost:5050/api/v1/storeManager/updateClothStatus",
        { clothId: id }
      );
      console.log("success");
      setPendingList(pendingList.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (pendingList.every((item) => item.donatedStatus)) {
      setShow(true);
    }
  }, [pendingList]);

  return (
    <div className="">
      <h1 className="text-5xl">Welcome Store Manager,</h1>
      <div>
        {show && (
          <p className="text-center text-lg text-gray-400">
            You have no pending donations to make !
          </p>
        )}
        <ul>
          {pendingList.map((item) =>
            !item.donatedStatus ? (
              <PendingCard
                item={item}
                updateDonateStatus={updateDonateStatus}
                key={item._id}
              >
                {" "}
              </PendingCard>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

function PendingCard({ item, updateDonateStatus, setShow }) {
  return (
    <div
      onClick={() => updateDonateStatus(item._id)}
      className="w-[450px] mx-auto border-2 border-black p-3 rounded-lg"
    >
      <div>
        <p className="capitalize text-xl font-semibold">{item.clothType}</p>
        <p className="text-xl font-semibold">
          Description:{" "}
          <span className=" italic font-normal text-red-600">
            {item.description}
          </span>
        </p>
        <p className="text-xl  italic text-green-600">
          <span className="not-italic font-semibold text-white">Size: </span>
          {item.size}
        </p>
        <button className="mt-3">Item has been donated</button>
      </div>
    </div>
  );
}
