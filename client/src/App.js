import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

/** Import all components**/
import Username from './components/Login'
import Home from './components/Home';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import NavBarWithLogout from './components/NavBarWithLogout';
import Role from './components/Role';
import Users from './components/Users';

/** Root Routes **/
const router = createBrowserRouter([
    {
        path: '/',
        element : <Username></Username>
    },
    {
        path: '/Home',
        element : <Home></Home>
    },

    {
        path: '/Roles',
        element : <Role></Role>
    },
    {
        path: '/Users',
        element : <Users></Users>
    },
    {
        path: '/Register',
        element : <Register></Register>
    },
    {
        path: '/Password',
        element : <Password></Password>
    },
    {
        path: '/Profile',
        element : <Profile></Profile>
    },
    {
        path: '/Recovery',
        element : <Recovery></Recovery>
    },
    {
        path: '/Reset',
        element : <Reset></Reset>
    },
   
    {
        path: '/NavBarWithLogout',
        element : <NavBarWithLogout></NavBarWithLogout>
    },
    {
        path: '*',
        element : <PageNotFound></PageNotFound>
    },


])


export default function app() {
  return (
    <main>
   <RouterProvider router={router}></RouterProvider>
   
    </main>
  )
}
