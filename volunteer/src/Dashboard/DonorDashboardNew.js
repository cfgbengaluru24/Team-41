import "./DonorDashboardNew.module.css";
import { useState } from "react";

export default function DonorDashboardNew() {
  const [seeState, setSeeState] = useState(null);

  return (
    <div>
      <h1>Donor Rahul Yadav</h1>
      <div>
        <div>
          <p className="">Clothes</p>
        </div>

        <div>
          <p>Students</p>
        </div>
      </div>
    </div>
  );
}
