import React from 'react';
import './EduParentInfo.css'
const EduParentInfo = ({ eduParent }) => {
  return (
    <div className="edu-parent-info">
      <h2>{eduParent.name}</h2>
      <p>Address: {eduParent.address}</p>
      <p>Amount Donated: {eduParent.amountDonated}</p>
      <div className="clothes-donated">
        <h3>Clothes Donated:</h3>
        <ul>
          {eduParent.clothesDonated.map((item, index) => (
            <li key={index}>{item.item} on {item.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EduParentInfo;

