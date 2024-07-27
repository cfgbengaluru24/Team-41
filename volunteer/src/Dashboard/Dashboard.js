import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // For styling

const mockData = [
  { volunteer_name: 'Alice Johnson', schools: [{ school_name: 'Springfield High' }, { school_name: 'Riverside Academy' }] },
  { volunteer_name: 'Bob Smith', schools: [{ school_name: 'Greenwood School' }, { school_name: 'Mountainview School' }] },
  { volunteer_name: 'Charlie Brown', schools: [{ school_name: 'Lincoln School' }, { school_name: 'Westside High' }] }
];

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replace with your API call when backend is ready
    // axios.get('/api/volunteers')
    //   .then(response => {
    //     setData(response.data);
    //   })
    //   .catch(error => {
    //     console.error("There was an error fetching the data!", error);
    //   });

    // Use mock data for now
    setData(mockData);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Volunteer Dashboard</h1>
      {data.map((volunteer, index) => (
        <div key={index} className="volunteer-section">
          <h2>{volunteer.volunteer_name}</h2>
          <ul>
            {volunteer.schools.map((school, i) => (
              <li key={i}>{school.school_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
