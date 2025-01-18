import React from 'react';
import './Error404_page.css';
import { useNavigate } from 'react-router-dom';

export const Error404_page = ({isLoggedIn}) => {
  const navlink= useNavigate();
 
  return (
    <div className="error-page">
      <div className="sky">
        <div className="sun"></div>
        <div className="moon"></div>
        <div className="clouds">
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
        </div>
        <div className="stars"></div>
      </div>

      <div className="center-content">
        <h1 className="error-title">404</h1>
        <p className="error-description">
          Oops! You’re lost in the clouds. The page you’re looking for doesn’t exist.
        </p>
        <button onClick={()=> { 
          isLoggedIn?
          navlink("/Home")
          :navlink("/")
        
        }} className='go-home'
          >
        Go to Back
        </button>
         
      
      </div>

      <div className="falling-star"></div>
    </div>
  );
};
