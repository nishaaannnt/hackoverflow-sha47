import React, { useEffect, useState } from "react";
import CameraTable from "../components/CameraTable";
import { Link } from "react-router-dom";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import UserTable from "../components/UserTable";

const Dashboard = () => {
  const [camera, setCamera] = useState([]);
  const [toggleTableUser, setToggleTableUser] = useState(false);
  const [userData, setUserdata] = useState([]);
  const {user,isloggedin}=useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/camera/all`);
        setCamera(response.data);
      } catch (err) {
        console.error("Error fetching camera data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCameraData();
  }, []);

  const handleClick = async (val) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/users/all`);
      setToggleTableUser(val);
      console.log(response.data);
      setUserdata(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isloggedin ? (
        <div className="p-8">
          <div className="py-6">
            <div className="flex space-x-4 mb-4">
              <button
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                onClick={() => handleClick(false)}
              >
                View Camera Table
              </button>
              <button
                className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
                onClick={() => handleClick(true)}
              >
                View User Table
              </button>
            </div>
          </div>
          <h1 className="my-6 py-4 text-center text-xl font-bold border-y-2 rounded-md">
            {!toggleTableUser? (<>All Registered Cameras</>):(<>All registered users</>)}
          </h1>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {!toggleTableUser ? (
                <>
                  {camera.length > 0 ? (
                    <CameraTable cameraData={camera} />
                  ) : (
                    <div className="text-center">
                      <h1 className="font-bold mb-6">--- No cameras registered ---</h1>
                    </div>
                  )}
                </>
              ) : (
                <> {userData.length > 0 ? (
                  <UserTable userData={userData} />) :(<>No users found</>)
                }</>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </>
  );
};

export default Dashboard;
