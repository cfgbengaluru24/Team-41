import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DonorDashboard = () => {
  const [donor, setDonor] = useState(null);
  const location = useLocation();
  const donorId = location.state?.donorId;

  useEffect(() => {
    if (donorId) {
      axios.get(`http://localhost:5050/api/donors/${donorId}`)
        .then(response => {
          setDonor(response.data);
        })
        .catch(error => {
          console.error('Error fetching donor data:', error);
        });
    }
  }, [donorId]);

  if (!donor) return <div>Loading...</div>;

  return (
    <div>
      <h1>Donor Dashboard</h1>
      <h2>{donor.name}</h2>
      <h3>Funded Students</h3>
      <ul>
        {donor.fundingTo.length ? (
          donor.fundingTo.map(student => (
            <li key={student._id}>
              <h4>{student.fullName}</h4>
              <iframe 
                src={student.report} 
                title={`Report for ${student.fullName}`} 
                width="600" 
                height="400" 
                style={{border: 'none'}}
                onError={() => console.error('Error loading report.')}
              ></iframe>
            </li>
          ))
        ) : (
          <li>No funded students available.</li>
        )}
      </ul>
    </div>
  );
};

export default DonorDashboard;