import React from 'react';
import './ReportCard.css'

const ReportCard = ({ reportUrl }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Student Report Card</h2>
      <iframe
        src={reportUrl}
        title="Report Card"
        style={{ width: '100%', height: '400px', border: 'none' }}
      />
    </div>
  );
}

export default ReportCard;