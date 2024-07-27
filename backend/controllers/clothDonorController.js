const ClothesDonor = require('../models/clothes_doner.models');
const Inventory = require('../models/inventory.models');
const Clothes = require('../models/clothes.models');

// Register a donor
const registerDonor = async (req, res) => {
  const { name, email, password, phone, address, city, state } = req.body;

  try {
    const newDonor = new ClothesDonor({
      name,
      email,
      password,
      phone,
      address,
      city,
      state
    });
    
    const savedDonor = await newDonor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a donor
const loginDonor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await ClothesDonor.findOne({ email });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register clothes
const registerClothes = async (req, res) => {
  const { donorId, inventoryId, clothType, clothDetails } = req.body;

  try {
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const maxCapacityDetail = inventory.maxCapacityDetails.find(detail => detail.clothType === clothType);
    const currentInventoryCount = inventory.inventoryDetails.filter(detail => detail.clothType === clothType).length;

    if (currentInventoryCount >= maxCapacityDetail.maxCapacity) {
      inventory.notifications.push({ clothType, donorId, clothId: newCloth._id });
      await inventory.save();
      return res.status(400).json({ message: 'Inventory is full for this cloth type. Added to notification list.' });
    }

    const newCloth = new Clothes(clothDetails);
    await newCloth.save();

    inventory.inventoryDetails.push(newCloth._id);
    await inventory.save();

    res.status(201).json(newCloth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerDonor,
  loginDonor,
  registerClothes
};
