// Home.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";
import NavBarWithLogout from "./NavBarWithLogout"; // Import the combined NavBarWithLogout component
import avatar from "../assets/profile.png";

export default function Home() {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <NavBarWithLogout /> {/* Use the combined NavBarWithLogout component */}
      <div className={styles.flexContainer}>
        <div className={styles.glass2}>
          <ul>
            <li>
              <Link to="/" className={styles.link}>
                HOME
                <span className={styles.playButton}>▶</span>
              </Link>
            </li>
            <li>
              <Link to="/roles" className={styles.link}>
                ROLES
                <span className={styles.playButton}>▶</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className={styles.link}>
                USERS
                <span className={styles.playButton}>▶</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.glass3}>
          {/* Center content within glass3 */}
          <div className={styles.profileContainer}>
            <img src={avatar} className={styles.profileImg} alt="avatar" />
            <h1>Welcome to Digitalflake admin</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
