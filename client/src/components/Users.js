import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import NavBarWithLogout from "./NavBarWithLogout"; // Import NavBar component
import styles from "../styles/Username.module.css";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 0, name: "John Doe", mobile: "1234567890", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 1, name: "Jane Smith", mobile: "2345678901", email: "jane@example.com", role: "Superadmin", status: "Inactive" },
    { id: 2, name: "Alice Johnson", mobile: "3456789012", email: "alice@example.com", role: "Caller", status: "Active" },
    { id: 3, name: "Bob Brown", mobile: "4567890123", email: "bob@example.com", role: "Account", status: "Inactive" },
    { id: 4, name: "Charlie Davis", mobile: "5678901234", email: "charlie@example.com", role: "Admin", status: "Active" },
    { id: 5, name: "Dave Wilson", mobile: "6789012345", email: "dave@example.com", role: "Superadmin", status: "Inactive" },
    { id: 6, name: "Eve Adams", mobile: "7890123456", email: "eve@example.com", role: "Caller", status: "Active" },
    { id: 7, name: "Frank White", mobile: "8901234567", email: "frank@example.com", role: "Account", status: "Inactive" },
    { id: 8, name: "Grace Miller", mobile: "9012345678", email: "grace@example.com", role: "Admin", status: "Active" },
    { id: 9, name: "Hank Green", mobile: "0123456789", email: "hank@example.com", role: "Superadmin", status: "Inactive" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const searchIconRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (id) => {
    // Handle edit logic
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAddUser = () => {
    // Handle add user logic
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      useAuthStore.getState().setUsername(values.username);
      navigate("/password");
    },
  });

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <NavBarWithLogout />
      <div className={styles.flexContainer}>
        {/* Side Navigation (if any) */}
        <div className={styles.glass2}>
          <ul>
            <li>
              <Link to="/" className={styles.link}>
                HOME <span className={styles.playButton}>▶</span>
              </Link>
            </li>
            <li>
              <Link to="/roles" className={styles.link}>
                ROLES <span className={styles.playButton}>▶</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className={styles.link}>
                USERS <span className={styles.playButton}>▶</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className={styles.glass3}>
          <div className={styles.userManagement}>
            <div className={styles.searchBarContainer}>
              <div className={styles.usersText}>USERS</div>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className={styles.searchBar}
                  onFocus={() => (searchIconRef.current.style.display = 'none')}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      searchIconRef.current.style.display = 'flex';
                    }
                  }}
                />
                <span ref={searchIconRef} className={styles.searchIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 96 960 960"
                    width="20"
                    fill="currentColor"
                  >
                    <path d="M796 931 527 662q-31 26-67.5 38.5T384 713q-88 0-149-61t-61-149q0-88 61-149t149-61q88 0 149 61t61 149q0 39-12.5 75.5T662 662l269 269-135 135Zm-412-292q63 0 106.5-43.5T534 489q0-63-43.5-106.5T384 339q-63 0-106.5 43.5T234 489q0 63 43.5 106.5T384 639Z"/>
                  </svg>
                </span>
              </div>
              <button className={styles.addButton} onClick={handleAddUser}>
                Add User
              </button>
            </div>

            <div className={styles.userList}>
              <div className={`${styles.userListHeader} ${styles.userListItem}`}>
                <span>ID</span>
                <span>Name</span>
                <span>Mobile</span>
                <span>Email ID</span>
                <span>Role</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {filteredUsers.map((user) => (
                <div key={user.id} className={styles.userListItem}>
                  <span>{user.id}</span>
                  <span>{user.name}</span>
                  <span>{user.mobile}</span>
                  <span>{user.email}</span>
                  <span>{user.role}</span>
                  <span
                    className={
                      user.status === "Active"
                        ? styles.activeStatus
                        : styles.inactiveStatus
                    }
                  >
                    {user.status}
                  </span>
                  <span>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(user.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(user.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
