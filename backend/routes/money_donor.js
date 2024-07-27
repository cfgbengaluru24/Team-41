import express from 'express';
import {
  getAllDonors,
  getDonorById,
  createDonor,
  updateDonor,
  deleteDonor
} from '../controllers/donorController.js';

const router = express.Router();

router.get('/', getAllDonors);
router.get('/:id', getDonorById);
router.post('/', createDonor);
router.put('/:id', updateDonor);
router.delete('/:id', deleteDonor);

export default router;