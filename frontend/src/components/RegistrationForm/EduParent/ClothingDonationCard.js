import React from 'react';
import './ClothingDonationCard.css';

const ClothingDonationCard = ({ donation }) => {
  return (
    <div className={`donation-card ${donation.status.replace(" ", "-")}`}>
      <h4>Type: {donation.item}</h4>
      <p>Inventory: {donation.inventory}</p>
      <p>Date: {donation.date}</p>
      <p>Status: {donation.status}</p>
    </div>
  );
};

export default ClothingDonationCard;