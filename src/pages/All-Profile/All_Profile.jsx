
import './All_Profile.css';
import {  Outlet } from 'react-router-dom';
import Profile_Cards from '../Profile_Cards/Profile_Cards.jsx';



const All_Profile = () => {
  return (
    <div className="Profile-containers">
      {/* Profile Cards Section */}
      <div className="profile-cards">
        <div className="title">
          <h2>All Profiles</h2>
        </div>
       <Profile_Cards/>
      </div>
    
       
      <div className="charts">
       
    
       
         
          <Outlet/>
          {/* <WhatsApp_Chart /> */}
         
         
       
      </div>
    </div>
  );
}
export default All_Profile