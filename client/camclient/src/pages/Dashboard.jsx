import React, { useEffect, useState } from "react";
import CameraTable from "../components/CameraTable";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Authcontext";

const Dashboard = () => {
  const { user, isloggedin } = useAuth();
  const [camera, setCamera] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (user && user.userid) {
        try {
          console.log(user);
          const response = await axios.get(
            `http://localhost:3001/api/camera/user/${user.userid}/camera`
          );
          console.log(response.data.length);
          setCamera(response.data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("user not available");
      }
    };

    fetch();
  }, [user]);

  return (
    <>
      {isloggedin ? (
        <div className="p-8">
          <div className="flex space-x-4 mb-4">
            
          </div>

          <div className="py-6 flex justify-between">
            <h1 className="text-xl font-medium">Hello {user.fullname},</h1>
            <Link to={"/addCamera"}><button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white">Add a Camera</button></Link>
          </div>
          <h1 className="my-6 py-4 text-center text-xl font-bold border-y-2 rounded-md  ">
            Your Registered Cameras
          </h1>
          {loading ? (
            <p className="text-center">Loadingggg....</p>
          ) : (
            <>
              {camera.length > 0 ? (
                <CameraTable camera={camera} userId={user.userid}/>
              ) : (
                <div className="text-center">
                  <h1 className=" font-bold mb-6">
                    --- No cameras Registered ---
                  </h1>
                  <button className=" bg-green-700  p-1 px-8 py-2 rounded-lg text-xl text-white hover:text-gray-300 font-medium">
                    <Link to="/addCamera">Add a camera</Link>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16 ">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </>
  );
};

export default Dashboard;
