import React from 'react';
import { FaPhone } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Profile_Cards.css';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaCommentSms } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";

import { BiSolidUserVoice } from "react-icons/bi";


// Define the card details in an object
const cardDetails = [
  { id: 1, title: 'WhatsApp', day: 'Today', total: '400', percentage: '300 (78%)', active: '100 (25%)', sent: 'send', delivered: 'Delivered', failed: 'Failed', icon: <IoLogoWhatsapp  />, route: 'whatsApp' },
  { id: 2, title: 'SMS', day: 'Today', total: '200', percentage: '250 (76%)', active: '100 (45%)', sent: 'send', delivered: 'Delivered', failed: 'Failed', icon: < FaCommentSms/>, route: 'sms' },
  { id: 3, title: 'Email', day: 'Today', total: '400', percentage: '350 (78%)', active: '100 (23%)', sent: 'send', delivered: 'Delivered', failed: 'Failed', icon: <MdMarkEmailRead />, route: 'email' },
  { id: 4, title: 'Voice ', day: 'Today', total: '400', percentage: '300 (70%)', active: '100 (27%)', sent: 'Outgoing Calls', delivered: 'Connected', failed: 'Failed', icon: <BiSolidUserVoice />, route: 'voice' },
];

const Profile_Cards = () => {
  return (
    <div className="Profile_cards">
      {cardDetails.map((card) => (
        <NavLink key={card.id} to={card.route} className="Profile_card">
          <span className="Card_title">{card.title}</span>
          <span className="Card_logo">{card.icon}</span>
          <span className="Card_day">{card.day}</span>
          <span className="Card_total_number">{card.total}</span>
          <span className="Card_percentage">{card.percentage}</span>
          <span className="Card_percentage_active">{card.active}</span>
          <span className="Card_sent">{card.sent}</span>
          <span className="Card_delivered">{card.delivered}</span>
          <span className="Card_failed">{card.failed}</span>
        </NavLink>
      ))}
    </div>
  );
}

export default Profile_Cards;
