const StoreManager = require('../models/store_manager.models');
const Inventory = require('../models/inventory.models');

// Registration function
const registerStoreManager = async (req, res) => {
  const { name, email, password, phone, address, city, state, inventoryName, inventoryPhone, inventoryCity, inventoryState, inventoryAddress, maxCapacityDetails } = req.body;

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
      name: inventoryName,
      phone: inventoryPhone,
      city: inventoryCity,
      state: inventoryState,
      address: inventoryAddress,
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
    const storeManager = await StoreManager.findOne({ email });
    if (!storeManager) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, storeManager.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: storeManager._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token, storeManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerStoreManager,
  loginStoreManager
};
