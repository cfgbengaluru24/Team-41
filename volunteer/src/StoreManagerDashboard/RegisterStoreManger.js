import React, { useState } from "react";
import axios from "axios";

function RegisterStoreManager() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    inventoryAddress: "",
    inventoryPhone: "",
    inventoryCity: "",
    inventoryState: "",
    maxCapacityDetails: [
      { clothType: "saree", maxCapacity: 0 },
      { clothType: "top", maxCapacity: 0 },
      { clothType: "jeans", maxCapacity: 0 },
      { clothType: "footwear", maxCapacity: 0 },
      { clothType: "others", maxCapacity: 0 },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, index] = name.split("-");
    if (field === "maxCapacity") {
      setFormData({
        ...formData,
        maxCapacityDetails: formData.maxCapacityDetails.map((item, i) =>
          i === parseInt(index) ? { ...item, maxCapacity: Number(value) } : item
        ),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);

    try {
      await axios.post(
        "http://localhost:5050/api/v1/storeManager/register",
        formData
      );
      console.log("data created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Store Manager Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Max Capacity Detail:</label>
          <div>
            {formData.maxCapacityDetails.map((item, index) => (
              <div key={index}>
                <label>
                  {item.clothType.charAt(0).toUpperCase() +
                    item.clothType.slice(1)}
                  :
                </label>
                <input
                  type="number"
                  name={`maxCapacity-${index}`}
                  value={item.maxCapacity}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterStoreManager;
