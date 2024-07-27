import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faDollarSign, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AdminMain = () => {
    const [donors, setDonors] = useState([]);
    const [donorsCount, setDonorsCount] = useState(0);
    const [totalFunding, setTotalFunding] = useState(0);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/donors');
                setDonors(response.data);
                setDonorsCount(response.data.length);
                calculateTotalFunding(response.data);
            } catch (error) {
                console.error('Error fetching donors:', error);
            }
        };

        const calculateTotalFunding = (donors) => {
            const total = donors.reduce((sum, donor) => sum + donor.amount, 0);
            setTotalFunding(total);
        };

        fetchDonors();
    }, []);

    return (
        <div className='profile-page'>
            <div className="profile-details">
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faUserFriends} size='2x' />
                        <span className='first-span'>{donorsCount}</span>
                    </div>
                    <span className='second-span'>Donors</span>
                </div>
                <div className="detail-item">
                    <div>
                        <FontAwesomeIcon icon={faDollarSign} size='2x' />
                        <span className='first-span'>${totalFunding}</span>
                    </div>
                    <span className='second-span'>Total Funding</span>
                </div>
            </div>
            <div className='donor-list'>
                <h2>Donor List</h2>
                <ul>
                    {donors.map(donor => (
                        <li key={donor._id} className='donor-item'>
                            <span>{donor.name}</span>
                            <span>{donor.email}</span>
                            <span>${donor.amount}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminMain;