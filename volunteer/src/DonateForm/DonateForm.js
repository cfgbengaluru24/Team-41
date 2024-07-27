import React, { useState } from "react";
import "./DonateForm.module.css";
import styles from "./DonateForm.module.css";
import axios from "axios";

// const { donorId, inventoryId, clothType, description, size } = req.body;

export default function DonateForm() {
  const [formData, setFormData] = useState({
    description: "",
    size: "",
    ageOfClothWearer: "",
    donatedBy: "",
    clothType: "",
    donorId: "Fasdgasfsdaf",
    inventoryId: "sadfasdsadd",
  });
  const [variant, setVariant] = useState("donateClothes");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:");

    try {
      await axios.post(
        "http://localhost:5050/api/v1/clothDonor/registerClothes",
        formData
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {variant === "donateClothes" && (
        <div className={styles.donate}>
          <h1>Donate Cloth Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Cloth Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Size of Cloth:</label>
              <select name="size" value={formData.size} onChange={handleChange}>
                <option value="">Select Cloth Type</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div>
              <label>Donated By:</label>
              <input
                type="text"
                name="donatedBy"
                value={formData.donatedBy}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Cloth Type:</label>
              <select
                name="clothType"
                value={formData.clothType}
                onChange={handleChange}
              >
                <option value="">Select Cloth Type</option>
                <option value="jeans">Jeans</option>
                <option value="saree">Saree</option>
                <option value="top">Top</option>
                <option value="footwear">Footwear</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
