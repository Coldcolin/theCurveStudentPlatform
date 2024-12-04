import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCheckCircle } from "react-icons/fa";
import logo from '../../images/logo.jpeg'; // Add this import (adjust path as needed)
import './SuccessPage.css';

const SuccessPage = () => {
  const navigate = useNavigate();
  // Assuming you pass the user's name through navigation state or URL params
  // You'll need to implement the actual way to get the user's name
  const userName = localStorage.getItem('firstName') || 'User';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
    <img src={logo} alt="Logo" className="SuccessLogo" />
      <div className="success-content">
        <FaRegCheckCircle className="success-icon" />
        <h2>Hey <span>{userName}</span>, welcome to the student platform!</h2>
        <p>You have successfully signed up</p>
      </div>
    </div>
  );
};

export default SuccessPage;