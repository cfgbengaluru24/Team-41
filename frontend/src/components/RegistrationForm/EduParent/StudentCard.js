import React from 'react';
import './StudentCard.css'

const StudentCard = ({ student }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: student.status === 'previous' ? '#bd2426' : '#24f553'
  };

  return (
    <div style={cardStyle}>

      <h3>{student.name}</h3>
      <p>Status: {student.status === 'current' ? 'Currently Sponsored' : 'Previously Sponsored'}</p>
    </div>
  );
}

export default StudentCard