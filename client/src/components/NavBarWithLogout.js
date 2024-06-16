// NavBarWithLogout.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from "../assets/group.png";
import avatar1 from "../assets/logout.png";
import styles from '../styles/Username.module.css';

function NavBarWithLogout() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowDialog(false);
    // Perform logout logic here, e.g., clearing authentication tokens, etc.
    navigate('/login'); // Redirect to login page or home after logout
  };

  const handleCancelLogout = () => {
    setShowDialog(false);
  };

  return (
    <nav className={styles.nav}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="profile flex justify-center py-4">
          <img src={avatar} className={styles.group_img} alt="avatar" />
        </div>
        <div>
          <button
            className="text-gray-300 mx-4"
            onClick={handleLogoutClick}
          >
            <img src={avatar1} className={styles.logout} alt="Logout" />
          </button>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to logout?</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleConfirmLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBarWithLogout;
