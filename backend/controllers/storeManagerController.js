const StoreManager = require('../models/store_manager.models');
const Inventory = require('../models/inventory.models');
const Clothes = require('../models/clothes.models');
const sendEmail = require('../utils/sendEmail');

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
        "populate" : {
          "path" : "donatedBy"
        },
      }
    });
    if (!storeManager) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }


    res.status(200).json({storeManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
 //pending
 const NotifyUsers = async (req, res) => {
  const { storeManagerId } = req.body;

  try {
    // Retrieve the StoreManager
    const storeManager = await StoreManager.findById(storeManagerId);

    if (!storeManager) {
      return res.status(404).json({ message: 'Store manager not found' });
    }

    // Retrieve the Inventory associated with the StoreManager
    const inventory = await Inventory.findById(storeManager.inventory).populate('notifications.clothId').populate('notifications.donorId');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const emailsToSend = [];
    const updatedNotifications = [];

    // Check notifications for items that can be reassigned
    inventory.notifications.forEach(notification => {
      const clothType = notification.clothType;
      const maxCapacityDetail = inventory.maxCapacityDetails.find(detail => detail.clothType === clothType);

      if (maxCapacityDetail) {
        const currentCount = inventory.inventoryDetails.filter(item => item.clothType === clothType).length;
        
        if (currentCount < maxCapacityDetail.maxCapacity) {
          // Item can be reassigned, send email
          const donor = notification.donorId;
          const cloth = notification.clothId;

          if (donor && cloth) {
            emailsToSend.push({
              to: donor.email,
              subject: `Reassignment Notification for ${clothType}`,
              html: 'Dear ${donor.name},<br><br>Your item "${cloth.description}" (${clothType}, size: ${cloth.size}) can now be reassigned to the store.<br><br>Best regards,<br>Inventory Team'
            });

            // Add notification to the updated notifications list
            updatedNotifications.push(notification);
          }
        }
      }
    });

    emailsToSend.forEach(async(email) => {
      await sendEmail({to:email.to,subject:email.subject,html:email.html});
    });

    // Respond with the updated notifications
    res.status(200).json({
      message: 'Notifications processed and emails sent',
      updatedNotifications
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

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
