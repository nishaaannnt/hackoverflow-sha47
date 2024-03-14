// DetailedInfoSidebar.jsx

import React, { useState,useEffect } from 'react';
import axios from "axios";

const DetailedInfoSidebar = ({ camera, users, onClose }) => {
  const [user, setUser] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersDetails = await axios.get(
          `http://localhost:3001/api/users/${users}`
        );
        console.log(camera)
        setUser(usersDetails.data[0]);
        console.log(usersDetails.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();

  }, [users])
  
  
  
  return (
    <div className="rounded-md  p-4 flex flex-col h-full justify-between">
      <div>
      <h2 className="text-xl font-bold mb-4 text-green-900"> {camera.cameraname}</h2>
      <p><span className="text-sm font-bold mb-4">Latitude:</span>{camera.latitude}</p>
      <p><span className="text-sm font-bold mb-4">Longitude:</span>{camera.longitude}</p>
      <p><span className="text-sm font-bold mb-4">Address:</span> <span className="text-sm mb-4">{camera.camaddress}</span></p>
      <p><span className="text-sm font-bold mb-4">Postal Code:</span> <span className="text-sm mb-4">{camera.postalcode}</span></p>
      <p><span className="text-sm font-bold mb-4">Property Type:</span> <span className="text-sm mb-4">{camera.entitytype}</span></p>
      <p><span className="text-sm font-bold mb-4">Record Capacity:</span> <span className="text-sm mb-4">{camera.record_capacity}</span></p>
      <br />
      <h2 className='text-md font-bold my-3 '>OWNER DETAILS</h2>
      {user && (
        <>
          <p><span className="text-sm font-bold mb-4">Owner Fullname:</span> <span className="text-sm mb-4">{user.fullname}</span></p>
          <p><span className="text-sm font-bold mb-4">Owner Email:</span> <span className="text-sm mb-4">{user.email}</span></p>
          <p><span className="text-sm font-bold mb-4">Owner Phone:</span> <span className="text-sm mb-4">{user.phone}</span></p>
          <p><span className="text-sm font-bold mb-4">Locale Name:</span> <span className="text-sm mb-4">{user.locale_name}</span></p>
          <p><span className="text-sm font-bold mb-4"> Address:</span> <span className="text-sm mb-4">{user.locale_address}</span></p>
          <p><span className="text-sm font-bold mb-4">Type:</span> <span className="text-sm mb-4">{user.locale_type}</span></p>
        </>
      )}
      </div>
      <button onClick={onClose} className="bg-green-500 rounded-md text- text-white p-2 mt-4">
        Close
      </button>
    </div>
  );
};

export default DetailedInfoSidebar;
