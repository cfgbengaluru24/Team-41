// register
const Inventory = require("../models/inventory.models.js");
const StoreManager = require("../models/store_manager.models.js");

const register = async (req, res) => {
  const { name, email, password, phone, address, city, state, inventory } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !inventory
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingManager = await StoreManager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const existingInventory = await Inventory.findById(inventory);
    if (!existingInventory) {
      return res.status(400).json({ message: "Inventory does not exist" });
    }
    if (existingInventory.owner) {
      return res
        .status(400)
        .json({
          message: "This inventory is already managed by another manager",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStoreManager = new StoreManager({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      state,
      inventory,
    });
    const savedManager = await newStoreManager.save();
    existingInventory.owner = savedManager._id;
    await existingInventory.save();

    res.status(201).json({ message: "Store manager registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//will update the history later ... need to test the function also
const updateHistory = async (req, res) => {

};

module.exports = { register };
