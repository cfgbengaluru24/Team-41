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
    const donor = await ClothesDonor.findOne({ email,password });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json({ message: 'Donor logged in successfully',donor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register clothes
//description,size,donatedBy,donatedTo,donatedStatus,donatedOn,clothType
//set up the status check , donatedOn has to be Date.now() clothType
const registerClothes = async (req, res) => {
    const { donorId, inventoryId, clothType, description, size } = req.body;
  
    try {
      const inventory = await Inventory.findById(inventoryId);
      if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }
  
      const maxCapacityDetail = inventory.maxCapacityDetails.find(detail => detail.clothType === clothType);
      const currentInventoryCount = inventory.inventoryDetails.filter(detail => detail.clothType === clothType).length;
  
      // Create the new cloth with provided details
      const newCloth = new Clothes({
        description,
        size,
        clothType,
        donatedBy: donorId,
        donatedTo: inventoryId,
        donatedStatus: false, // Default status
        donatedOn: Date.now()
      });
  
      if (currentInventoryCount >= maxCapacityDetail.maxCapacity) {
        // Inventory is full for this cloth type, add to notifications
        inventory.notifications.push({ clothType, donorId, clothId: newCloth._id });
        await inventory.save();
  
        await newCloth.save();
        return res.status(400).json({ message: 'Inventory is full for this cloth type. You will be updated as soon as we have space.', newCloth });
      }
  
      // Update the donatedStatus to true as it can be assigned to the inventory
      newCloth.donatedStatus = true;
      await newCloth.save();
  
      inventory.inventoryDetails.push(newCloth._id);
      await inventory.save();
  
      res.status(201).json(newCloth);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getCitiesWithInventories = async (req, res) => {
    try {
      const cities = await Inventory.distinct('city');
      const cityInventories = await Promise.all(
        cities.map(async (city) => {
          const inventories = await Inventory.find({ city }).select('name address phone state');
          return {
            city,
            inventories
          };
        })
      );
  
      res.status(200).json(cityInventories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  

module.exports = {
  registerDonor,
  loginDonor,
  registerClothes,
  getCitiesWithInventories,
};
