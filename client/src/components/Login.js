import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import avatar from "../assets/profile.png";
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      Email: '',
      password: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.Email); // Assuming 'Email' is the correct field to set
      navigate('/password');
    }
  });

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
           
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />    
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <p className={styles.textbox} type="text">Welcome to Digitalflake admin</p> 
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input 
                {...formik.getFieldProps('Email')} 
                className={styles.textbox1} 
                type="text" 
                placeholder="Email" 
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input 
                {...formik.getFieldProps('password')} 
                className={styles.textbox2} 
                type="password" 
                placeholder="Password" 
              />
            </div>

            <div className="text-center py-4">
              <span>
                <Link className={styles.link} to="/register">
                  Forgot Password?
                </Link>
                <button className={styles.btn} type="submit">Log In</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
