import React from 'react';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const handlePhoneClick = () => {
    // Handle click action for customer care phone number
  };

  const handleMailClick = () => {
    // Handle click action for customer care email
  };

  return (
    <footer className="footer">
      <div className="customer-care">
        <div className="customer-care-item" onClick={handlePhoneClick}>
          <AiFillPhone className="icon" />
          <span>Customer Care Number</span>
        </div>
        <div className="customer-care-item" onClick={handleMailClick}>
          <AiOutlineMail className="icon" />
          <span>Customer Care Email</span>
        </div>
      </div>
      <div className="address">
        <span>123 Main Street, City, Country</span>
      </div>
      <div className="social-media">
        <FaFacebookF className="icon" />
        <FaInstagram className="icon" />
        <FaTwitter className="icon" />
        <FaYoutube className="icon" />
      </div>
    </footer>
  );
};

export default Footer;
