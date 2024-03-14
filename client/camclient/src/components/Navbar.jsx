import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { useAuth } from '../context/Authcontext';
import Logout from './Logout';

const NavBar = () => {
  const {isloggedin,user}=useAuth();
  return (
    <nav className=" p-4 border-b-2 shadow-xl  rounded-r-md">
      <div className=" mx-auto flex justify-between items-center">
        <div className='text-dark-green text-xl px-8 font-bold'>SHA- 47 Drishti</div>
        <div className="flex justify-between items-center space-x-4 ">
          {!isloggedin ? (
          <>
          <div className="bg-[#006e43] p-1 px-4 py-2 rounded-lg text-white hover:text-gray-300"><Link to = "/login" >Login</Link></div>
          <div className="bg-[#006e43] p-1 px-4 py-2 rounded-lg text-white hover:text-gray-300"><Link to = "/signup">Signup</Link></div>
          </>
        ):(<div className='px-4 flex items-center gap-3'>
          <PersonRoundedIcon className={`bg-dark-green text-white  rounded-full my-2  border border-dark-green cursor-pointer z-50 `}/>
          <p className='text-xl font-medium'>{user.fullname}</p>
          <Logout/>
          </div>
        )} 
          

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
