import { useState } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import "./Hom.css";
import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import { FaHome, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

import { BiSolidDashboard } from "react-icons/bi";
import { RiFileList3Fill } from "react-icons/ri";
import { PiLineSegmentsFill } from "react-icons/pi";
import { GrTechnology } from "react-icons/gr";

import { GrIntegration } from "react-icons/gr";
import { SiGoogleanalytics } from "react-icons/si";
import { FcMenu } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
import Dashboard from "../Dashboard/Dashboard";
import List from "../../pages/List-Segment/List";
import WhatsApp_Chart from "../../pages/WhatsApp-Chart/WhatsApp.Charts";
import All_Profile from "../../pages/All-Profile/All_Profile";
import MovingText from "../MovingText/Moving_Text";
import List_member_table from "../../pages/List_member_table/List_member_table";
import Fields from "../Fields/Fields";
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);

  return (
    <div className="home-containers">
   
      {/* Sidebar */}
      <div className={`side-container ${isMenuOpen ? "toggle-menu" : ""}`}>
        <div className="logo">
          <NavLink to="/home/sms">
            <span className="Intel-logo">
              <img src={logo} alt="IntelData Logo" />
            </span>
            <span className="sidebar-title">IntelData</span>
          </NavLink>
        </div>
        <div className="sidebar-links">
          <ul>
            <li>
              <NavLink to="/home/sms">
                <span className="icons"><FaHome size={18} /></span> <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/home/dashboard">
                <span className="icons"><BiSolidDashboard size={18} /></span> <span>Dashboard</span>
              </NavLink>
            </li>
            <li onClick={toggleSubMenu} className="collapsible-menu">
              <span><ImLinkedin size={18} /></span>
              <span>Intel</span>
              <span className="chevron">{isSubMenuOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </li>
            {isSubMenuOpen && (
              <ul className="sub-link">
                <li>
                  <NavLink to="/home/list">
                    <span className="icons"><RiFileList3Fill size={17} /></span> <span>List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/home/fields">
                    <span className="icons"><GrTechnology size={17} /></span> <span>Fields</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/home/dashboard">
                    <span className="icons"><PiLineSegmentsFill size={17} /></span> <span>Segment</span>
                  </NavLink>
                </li>
              </ul>
            )}
            <li>
              <NavLink to="/error">
                <span className="icons"><SiGoogleanalytics size={18} /></span> <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/error">
                <span className="icons"><GrIntegration size={18} /></span> <span>Integrations</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/error">
                <span className="icons"><IoSettingsSharp size={18} /></span> <span>Settings</span>
              </NavLink>
            </li>
          </ul>
          <div className="logout">
            <NavLink to="/">
              <span className="icons"><FiLogOut size={18} /></span> <span>LogOut</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-container ${isMenuOpen ? "large-main-container" : ""}`}>
        {/* Topbar */}
        <div className="topbar">
          <div className="toggle" onClick={toggleMenu}>
            <FcMenu size={22} />
          </div>
          {/* <MovingText /> */}
          <div className="profile-pg">
            <img src={user} alt="Profile" />
          </div>
        </div>

        {/* Main Content Routes */}
        <div className="users-details">
          <Routes>
            {/* Default SMS Route */}
           
            <Route path="/" element={<Navigate to="sms" />} />
            
            {/* Nested Routes */}
            <Route path="/" element={<All_Profile />}>
              <Route path="whatsapp" element={<WhatsApp_Chart title="WhatsApp" />} />
              <Route path="email" element={<WhatsApp_Chart title="Email" />} />
              <Route path="voice" element={<WhatsApp_Chart title="Voice Calls" />} />
              <Route path="sms" element={<WhatsApp_Chart title="SMS" />} />
            </Route>
           
            <Route path="dashboard" element={<Dashboard />} />
           
            <Route path="list" element={<List />} />
            <Route path="fields" element={<Fields />} />
            <Route path="/list/members" element={<List_member_table />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
