// SettingsPage.js
import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const SettingsPage = () => {
  const {user,isloggedin}= useAuth();

  return (
    <div className="container shadow-md mx-auto my-8 p-8 rounded-lg">
      {isloggedin?<>
      <h2 className="text-3xl font-semibold mb-8 text-center text-green-600">Account Settings</h2>
<hr className='mb-8'/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className='text-xl w-2/3'>
          <h3 className="text-2xl font-medium mb-6">User Information</h3>

          <p className="mb-2">
            <span className="font-semibold ">Full Name:</span> {user.fullname}
          </p>
          <p className="mb-2">
            <span className="font-semibold ">Email:</span> {user.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold ">Locale Name:</span> {user.locale_name}
          </p>
          <p className="mb-2">
            <span className="font-semibold ">Locale Address:</span> {user.locale_address}
          </p>
          <p className="mb-2">
            <span className="font-semibold ">Locale Type:</span> {user.locale_type}
          </p>
          <p className="mb-2">
            <span className="font-semibold ">Phone No:</span> {user.phone}
          </p>
        </div>
        <div className='text-xl w-2/3'>
          <h3 className="text-2xl font-medium mb-6">Account Settings</h3>

          <form className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-700">Change Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded"
                placeholder="New Password"
              />
            </div>
            
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        </div>

        
      </div></>:(
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16 ">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </div>
  );
};

export default SettingsPage;
