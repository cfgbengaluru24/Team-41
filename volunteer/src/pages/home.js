import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHandsHelping, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './home.css';

function Home() {
  return (
    <div className="home-container">
      <iframe 
        src='https://my.spline.design/garden-65c21a4f8311e81c6a016a9d3cd685e1/' 
        frameBorder='0' 
        title="3D Portfolio Start Page"
        className="spline-scene">
      </iframe>
      <div className="content">
        <h1>Aspire and Glee</h1>
        <p>Let's Intend To Spread Smiles</p>
        <div className="features">
          <div className="feature-item">
            <FontAwesomeIcon icon={faHeart} size="3x" />
            <h3>Support</h3>
            <p>Providing essential support to those in need.</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faHandsHelping} size="3x" />
            <h3>Community</h3>
            <p>Building strong, resilient communities.</p>
          </div>
          <div className="feature-item">
            <FontAwesomeIcon icon={faGlobe} size="3x" />
            <h3>Global Impact</h3>
            <p>Making a difference worldwide.</p>
          </div>
        </div>
        <div className="links">
          <a href="/signin">Donor Sign Up</a>
          <a href="/signin">Volunteer Sign Up</a>
          <a href="/inventory">Inventory</a>
        </div>
        <div className="about">
          <h2>About Aspire and Glee</h2>
          <p>Aspire and Glee is dedicated to supporting communities through various initiatives. Our goal is to empower individuals and create sustainable growth, both locally and globally. Join us in making a difference by becoming a donor or volunteer today.</p>
        </div>
      </div>
      <div className='cover'>Explore</div>
    </div>
  );
}

export default Home;