import React, { useState, useEffect } from 'react';
import EduParentInfo from './EduParentInfo';
import ReportCard from './ReportCard';
import './EduParent.css';

const EduParentDashboard = () => {
  const eduParent = {
    name: "John Doe",
    address: "1234 Elm St, Springfield",
    amountDonated: "$10,000",
    clothesDonated: [
      { item: "Jackets", date: "2024-01-15" },
      { item: "Trousers", date: "2024-02-10" },
    ],
  };

  const [selectedReport, setSelectedReport] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Replace this with your data fetching logic
    const fetchedStudents = [
      { id: 1, name: "Alice", status: "currently sponsored", reportUrl: "http://1.bp.blogspot.com/-RfgVz86BpLo/T6LtMliGveI/AAAAAAAAAGI/533mKkr77E0/s1600/Report+Card+Clipart.jpg" },
      { id: 2, name: "Bob", status: "currently sponsored", reportUrl: "https://i.pinimg.com/originals/51/3a/69/513a69de731a744a2970d1811ab21809.jpg" },
      { id: 3, name: "Charlie", status: "not sponsored" },
      { id: 4, name: "Bob", status: "currently sponsored", reportUrl: "https://i.pinimg.com/originals/51/3a/69/513a69de731a744a2970d1811ab21809.jpg" },
      { id: 5, name: "Bob", status: "currently sponsored", reportUrl: "https://i.pinimg.com/originals/51/3a/69/513a69de731a744a2970d1811ab21809.jpg" },
      
      // Add more students as needed
    ];
    setStudents(fetchedStudents);
  }, []);

  const handleCardClick = (student) => {
    if (student.status === "currently sponsored") {
      setSelectedReport(student.reportUrl);
    } else {
      setSelectedReport(null);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="info-section">
        <EduParentInfo eduParent={eduParent} />
      </div>
      <div className="students-section">
        {students.map(student => (
          <div
            key={student.id}
            className={`student-card ${student.status.replace(" ", "-")}`}
            onClick={() => handleCardClick(student)}
            style={{ cursor: student.status === 'currently sponsored' ? 'pointer' : 'not-allowed' }}
          >
            <h3>{student.name}</h3>
            <p>Status: {student.status}</p>
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="report-card-section">
          <ReportCard reportUrl={selectedReport} />
        </div>
      )}
    </div>
  );
};

export default EduParentDashboard;
