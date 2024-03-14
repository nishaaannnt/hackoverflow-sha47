import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useAuth } from '../context/AuthContext';
import Logout from './Logout';
import privcamActive from '../assets/markers/privcamActive.png'
import privcamInactive from '../assets/markers/privcamInactive.png'

const NavBar = () => {
  const { isloggedin, user } = useAuth();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <nav className="p-4 border-b-2 shadow-xl rounded-r-md">
      <div className="mx-auto flex justify-between items-center">
        <div className='text-dark-green text-xl px-8 font-bold'>Police Panel</div>
        <div className="flex justify-between items-center space-x-4 ">
          {!isloggedin ? (
            <>
              <div className="bg-[#006e43] p-1 px-4 py-2 rounded-lg text-white hover:text-gray-300">
                <Link to="/login">Login</Link>
              </div>
              <div className="bg-[#006e43] p-1 px-4 py-2 rounded-lg text-white hover:text-gray-300">
                <Link to="/signup">Signup</Link>
              </div>
            </>
          ) : (
            <div className="px-4 flex items-center gap-3 relative">
              <HelpRoundedIcon
                className={`bg-dark-green text-white rounded-full border border-dark-green cursor-pointer z-50`}
                onMouseEnter={() => setShowHelp(true)}
                onMouseLeave={() => setShowHelp(false)}
              />
              {showHelp && (
                <div className="absolute top-8 right-12 bg-white p-2 rounded-md shadow-md z-50">
                  {/* Your help content goes here */}
                  <div className='flex flex-row gap-3 mt-3'>
                  <p className='font-bold'>Camera Active</p>
                  <img src={privcamActive} alt="Camera Active" />
                  </div>
                  <div className='flex flex-row gap-3 mt-3'>
                  <p className='font-bold'>Camera Inactive</p>
                  <img src={privcamInactive} alt="Camera Inactive" />
                  </div>
                </div>
              )}
              <PersonRoundedIcon className={`bg-dark-green text-white rounded-full border border-dark-green cursor-pointer z-50`} />
              <p className="text-xl font-medium">{user.fullname}</p>
              <Logout />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
