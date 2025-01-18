import React from 'react';
import './Dashboard.css'
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { FaPhone } from "react-icons/fa";
import DataTable from '../../pages/All-User-data/Data_Table.jsx';
import Add_Profile from '../../Add_Profile/Add_Profile.jsx';

const Dashboard = () => {
 
 
  const cardDetails = {
    1: { title: 'Active User', value: '2.2k', icon: <FaPhone size={25} />, route: '/active-user' },
   
    2: { title: 'Active Profiles', value: '22.2k', icon: <FaRegCircleUser size={33} />, route: '/active-profiles' },
    3: { title: 'Inactive Profiles', value: '12.4k', icon: <FaRegCircleUser size={33} />, route: '/inactive-profiles' },
  };
  return (
    <div className="Profile-container">
      {/* Profile Cards Section */}
      <div className="data-profile-cards">
        <div className="title">
          <h2>All Profiles</h2>
        </div>
        <div className=" data-cards">
          {Object.entries(cardDetails).map(([key, card]) => (
            <NavLink key={key} to={card.route} className="data-card">
              <div className="data-card-icon">
                <h3>{card.value}</h3>
                <span>{card.icon}</span>
              </div>
              <div className="data-card-mes">
                <div className="data-mes">{card.title}</div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* All Users Information Data*/}

      <div className="All_User_Information">
        
        {/* <div className="User_Information">
         
        </div> */}
         <DataTable/>

      </div>
    
    </div>
  );
};

export default Dashboard;





















