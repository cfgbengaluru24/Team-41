const StoreManager = require('../models/store_manager.models');
const Inventory = require('../models/inventory.models');
const Clothes = require('../models/clothes.models');

// Registration function
const registerStoreManager = async (req, res) => {
  const { name, email, password, phone, address, city, state,maxCapacityDetails } = req.body;

  try {
    // Check if email already exists
    const existingManager = await StoreManager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create store manager
    const storeManager = new StoreManager({
      name,
      email,
      password,
      phone,
      address,
      city,
      state
    });

    const inventory = new Inventory({
      phone,
      city,
      state,
      address,
      owner: storeManager._id,
      maxCapacityDetails
    });

    const savedInventory = await inventory.save();
    storeManager.inventory = savedInventory._id;

    // Save store manager
    await storeManager.save();

    res.status(201).json({ message: 'Store manager registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login function
const loginStoreManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find store manager by email
    const storeManager = await StoreManager.findOne({ email }).populate({
      "path" : "inventory",
      "populate" : {
        "path" : "inventoryDetails",
      }
    });;
    if (!storeManager) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    res.status(200).json({storeManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
 //pending
const NotifyUsers = async(req,res)=>{
  const {storeManagerId} = req.body;
  const storeManager = await StoreManager.findById(storeManagerId);



}

const updateClothStatus  = async(req,res)=>{
  const {clothId} = req.body;

  const cloth = await Clothes.findById(clothId);
  if(!cloth){
    res.status(404).json({message : "Cloth not found"});
  }

  cloth.donatedStatus= true;
  await cloth.save();

  res.status(200).json({message : "Successfully donated the cloth",cloth});
}

module.exports = {
  registerStoreManager,
  loginStoreManager,
  updateClothStatus,
};
