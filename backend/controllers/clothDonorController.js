const ClothesDonor = require('../models/clothes_doner.models');
const Inventory = require('../models/inventory.models');
const Clothes = require('../models/clothes.models');
const sendEmail = require('../utils/sendEmail');
const CustomError = require('../middleware/error-handler');

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
    const donor = await ClothesDonor.findOne({ email,password }).populate({
      path : "clothDetails",
    });
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
    console.log(inventoryId);
    try {

      const donor = await ClothesDonor.findById(donorId);
      if(!donor){
        res.status(404).json({ message: 'Donor not found' });
      }

      const inventory = await Inventory.findById(inventoryId).populate('inventoryDetails');
      console.log(inventory);
      if (!inventory) {
        return res.status(404).json({ message: 'Inventory not found' });
      }

      const maxCapacityDetail = inventory.maxCapacityDetails.find(detail => detail.clothType === clothType);
      const currentInventoryCount = inventory.inventoryDetails.filter(detail => detail.clothType === clothType).length;
      // console.log(maxCapacityDetail);
      // console.log(currentInventoryCount);

      console.log(maxCapacityDetail);
      console.log(currentInventoryCount);
      // console.log(inventory);

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
        newCloth.isAssignedToStore = false;
        await inventory.save();
        await newCloth.save();
        donor.clothDetails = [...donor.clothDetails, newCloth._id];
        await donor.save();
        await handleHistory(inventoryId,clothType);
        return res.status(400).json({ message: 'Inventory is full for this cloth type. You will be updated as soon as we have space.', newCloth });
      }
  
      // Update the donatedStatus to true as it can be assigned to the inventory
      // newCloth.donatedStatus = true;
      newCloth.isAssignedToStore = true;
      await newCloth.save();
      
      donor.clothDetails = [...donor.clothDetails, newCloth._id];
      await donor.save();

      inventory.inventoryDetails.push(newCloth._id);
      await inventory.save();
  
      res.status(201).json(newCloth);
      // res.status(201).json({"msg" : "Hello"})
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
  const handleHistory = async (req, res,inventoryId,clothType) => {
    try {
        // console.log(req.body);

        const validClothTypes = ['jeans', 'saree', 'top', 'footwear', 'others'];

        if (!validClothTypes.includes(clothType)) {
            clothType = 'others';
        }

        const inventory = await Inventory.findById(inventoryId);
        if (!inventory) {
            return ;
        }

        let historyItem = inventory.missHistory.find(item => item.clothType === clothType);

        if (historyItem) {
            historyItem.missedTimes += 1;
        } else {
            historyItem = inventory.missHistory.find(item => item.clothType === 'others');
            if (historyItem) {
                historyItem.missedTimes += 1;
            } else {
                inventory.missHistory.push({ clothType: 'others', missedTimes: 1 });
            }
        }

        await inventory.save();

        // res.status(200).json({ msg: 'Miss history updated successfully', missHistory: inventory.missHistory });
        return;
    } catch (error) {
        console.error(error);
        throw new Error('Error');
        // res.status(500).json({ msg: 'Server error' });
    }
};  
//TEST THIS FUNCTION AND ALSO CALL THIS FUNCTION AT A RELEVANT CODE POINT 
const resetMissHistory = async (req, res) => {
  try {
      const today = new Date();
      const isResetDate = today.getDate() === 1 && [0, 4, 8].includes(today.getMonth());

      if (!isResetDate) {
          return res.status(400).json({ msg: 'Not the reset date' });
      }

      const inventories = await Inventory.find();
      
      inventories.forEach(inventory => {
          inventory.missHistory.forEach(historyItem => {
              historyItem.missedTimes = 0;
          });
      });

      await Promise.all(inventories.map(inventory => inventory.save()));

      res.status(200).json(inventories);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
  }
};

const reRequestCloth = async(req,res)=>{
    const {clothId} = req.body;

    const cloth = await Clothes.findById(clothId);
    if(!cloth){
        return res.status(404).json({msg : "Cloth not found"});
    }

    const inventory = await Inventory.findById(cloth.donatedTo);

    if(!inventory){
        return res.status(404).json({msg : "Inventory not found"});
    }

    const maxCapacityDetail = inventory.maxCapacityDetails.find(detail => detail.clothType === cloth.clothType);
    const currentInventoryCount = inventory.inventoryDetails.filter(detail => detail.clothType === cloth.clothType).length;

    if(currentInventoryCount>= maxCapacityDetail.maxCapacity){
        return res.status(400).json({msg : "Inventory is full for this cloth typ you will be updated as soon as we have space"});
    }

    inventory.inventoryDetails.push(clothId);
    cloth.isAssignedToStore = true;
    await cloth.save();
    await inventory.save();

    return res.status(200).status({msg : "Cloth added to inventory successfully",cloth});
}

module.exports = {
  registerDonor,
  loginDonor,
  registerClothes,
  getCitiesWithInventories,
  handleHistory,
  resetMissHistory,
  reRequestCloth
};
