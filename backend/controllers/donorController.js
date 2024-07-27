const Donors = require('../models/money_donorModel.js');

// Get all donors
const getAllDonors = async (req, res) => {
  try {
    const donors = await Donors.find().populate('fundingTo', 'fullName age class');
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get donor by ID
const getDonorById = async (req, res) => {
  try {
    const donor = await Donors.findById(req.params.id).populate('fundingTo', 'fullName age class');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new donor
const createDonor = async (req, res) => {
  const { name, amount, fundingTo } = req.body;

  const newDonor = new Donors({
    name,
    amount,
    fundingTo
  });

  try {
    const savedDonor = await newDonor.save();
    res.status(201).json(savedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update donor by ID
const updateDonor = async (req, res) => {
  const { id } = req.params;
  const { name, amount, fundingTo } = req.body;

  try {
    const updatedDonor = await Donors.findByIdAndUpdate(
      id,
      { name, amount, fundingTo },
      { new: true }
    );

    if (!updatedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete donor by ID
const deleteDonor = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDonor = await Donors.findByIdAndDelete(id);

    if (!deletedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    res.status(200).json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDonors,
  getDonorById,
  createDonor,
  updateDonor,
  deleteDonor
};
