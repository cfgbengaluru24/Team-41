import React from 'react';
import './EduParentInfo.css'
const EduParentInfo = ({ eduParent }) => {
  return (
    <div className="edu-parent-info">
      <h2>{eduParent.name}</h2>
      <p>Address: {eduParent.address}</p>
      <p>Amount Donated: {eduParent.amountDonated}</p>
  
    </div>
  );
};

export default EduParentInfo;

