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

export default function Role() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", status: "Active" },
    { id: 2, name: "Superadmin", status: "Inactive" },
    { id: 3, name: "Caller", status: "Active" },
    { id: 4, name: "Account", status: "Inactive" },
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
    setRoles(roles.filter((role) => role.id !== id));
  };

  const handleAddRole = () => {
    // Handle add role logic
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

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className={styles.roleManagement}>
            <div className={styles.searchBarContainer}>
              <div className={styles.rolesText}>ROLES</div>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search roles..."
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
              <button className={styles.addButton} onClick={handleAddRole}>
                Add Role
              </button>
            </div>

            <div className={styles.roleList}>
              <div className={styles.roleListHeader}>
                <span>ID</span>
                <span>Role Name</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {filteredRoles.map((role) => (
                <div key={role.id} className={styles.roleListItem}>
                  <span>{role.id}</span>
                  <span>{role.name}</span>
                  <span
                    className={
                      role.status === "Active"
                        ? styles.activeStatus
                        : styles.inactiveStatus
                    }
                  >
                    {role.status}
                  </span>
                  <span>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(role.id)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDelete(role.id)}
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
