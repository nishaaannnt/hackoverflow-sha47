import React, { useState, useEffect } from "react";
import cctvTypes from "../assets/cctvTypes";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";
import SelectMap from "../components/SelectMap";
import Description from "../components/Description";
import Chatbot from "../components/Chatbot";

const AddCameraForm = () => {
  const { user, isloggedin } = useAuth();
  const [camera, setCameras] = useState({
    cameraname: "",
    userId: user?.userid,
    visibilityRange: "",
    status: "",
    model: "",
    resolution: "",
    record_capacity: "",
  });
  const [locationData, setlocationData] = useState({});
  const [chatbotOpen, setchatbotOpen] = useState(false);
  useEffect(() => {
    console.log(locationData);
  }, [locationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(locationData);
    console.log(locationData.address);
    try {
      const {
        cameraname,
        userId,
        visibilityrange,
        status,
        model,
        resolution,
        record_capacity,
        entitytype,
      } = camera;
      const { address, postalCode, lat, lon } = locationData;
      // console.log(user.userid);
      const response = await axios.post(
        `http://localhost:3001/api/camera/user/${user.userid}/camera`,
        {
          cameraname,
          latitude: locationData.lat,
          userId,
          longitude: locationData.lon,
          address,
          postalCode,
          visibilityrange,
          status,
          model,
          resolution,
          record_capacity,
          entitytype,
        }
      );
      console.log(response.data);
      toast.success("Camera Added");
      const logsData = {
        camid: response.data.camid,
        timestamp: new Date().toISOString(),
        message: "New Camera Added",
        userid: userId,
      };
      try {
        const logs = await axios.post(
          `http://localhost:3001/api/logs/`,
          logsData
        );
        console.log(logs);
      } catch (err) {
        console.log(err);
        toast.error("Error Entering logs");
      }
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Something went wrong. Try later");
    } finally {
      console.log("done");
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(camera);
    setCameras({ ...camera, [name]: value });
  };

  return (
    <div className="flex h-full">
      {isloggedin ? (
        <>
          <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8 w-[90%]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-2xl font-bold leading-0 tracking-tight text-dark-green">
                Add New Camera
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto w-2/3 border-2  p-8 rounded-xl">
              <form
                action=""
                onSubmit={(e) => handleSubmit(e)}
                className="space-y-6"
                method="POST"
              >
                <div className="">
                  <label
                    htmlFor="cameraName"
                    className="block text-sm font-medium leading-6"
                  >
                    Camera Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="cameraName"
                      name="cameraname"
                      type="text"
                      onChange={handleInputs}
                      autoComplete="off"
                      placeholder="Enter camera name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="camaddress"
                    className="block text-sm font-medium leading-6"
                  >
                    Cam Address
                  </label>
                  <input
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="Enter a location"
                    id="searchInput"
                  />
                  <div className="mt-8">
                    <SelectMap onDataSubmit={setlocationData} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="visibilityRange"
                    className="block text-sm font-medium leading-6"
                  >
                    Visibility Range
                  </label>
                  <div className="mt-2">
                    <input
                      id="visibilityRange"
                      name="visibilityrange"
                      type="text"
                      onChange={handleInputs}
                      autoComplete="off"
                      placeholder="Enter visibility range"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-between">
                  <div className="w-full">
                    <label
                      htmlFor="locale"
                      className="block text-sm font-medium leading-6"
                    >
                      Locale
                    </label>
                    <div className="mt-2">
                      <select
                        id="locale"
                        name="locale"
                        onChange={handleInputs}
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled selected>
                          -- Select locale --
                        </option>
                        <option value="Business">Business</option>
                        <option value="Institute">Institute</option>
                        <option value="Home">Home</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium leading-6"
                    >
                      Type
                    </label>
                    <div className="mt-2">
                      <select className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <option value="" disabled selected>
                          -- Select Type--
                        </option>
                        {cctvTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 justify-between">
                  <div className="w-full">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <select
                        id="status"
                        name="status"
                        onChange={handleInputs}
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled selected>
                          -- Select status --
                        </option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="model"
                      className="block text-sm font-medium leading-6"
                    >
                      Model
                    </label>
                    <div className="mt-2">
                      <input
                        id="model"
                        name="model"
                        type="text"
                        onChange={handleInputs}
                        autoComplete="off"
                        placeholder="Enter model"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 justify-between">
                  <div className="w-full">
                    <label
                      htmlFor="resolution"
                      className="block text-sm font-medium leading-6"
                    >
                      Resolution
                    </label>
                    <div className="mt-2">
                      <select
                        id="resolution"
                        name="resolution"
                        onChange={handleInputs}
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="" disabled selected>
                          -- Select resolution --
                        </option>
                        <option value="176x120">QCIF (176 x 120)</option>
                        <option value="352x240">CIF (352 x 240)</option>
                        <option value="704x240">2CIF (704 x 240)</option>
                        <option value="704x480">4CIF (704 x 480)</option>
                        <option value="720x480">D1 (720 x 480)</option>
                        <option value="1280x720">720p HD (1280 x 720)</option>
                        <option value="1280x960">960p HD (1280 x 960)</option>
                        <option value="1280x1024">1.3 MP (1280 x 1024)</option>
                        <option value="1600x1200">2 MP (1600 x 1200)</option>
                        <option value="1920x1080">
                          1080p HD (1920 x 1080)
                        </option>
                        <option value="2048x1536">3 MP (2048 x 1536)</option>
                        <option value="2688x1520">4 MP (2688 x 1520)</option>
                        <option value="2592x1944">5 MP (2592 x 1944)</option>
                        <option value="3072x2048">6 MP (3072 x 2048)</option>
                        <option value="3840x2160">
                          8 MP / 4K (Coax) (3840 x 2160)
                        </option>
                        <option value="4000x3000">
                          12 MP / 4K (IP) (4000 x 3000)
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="record_capacity"
                      className="block text-sm font-medium leading-6"
                    >
                      Record Capacity
                    </label>
                    <div className="mt-2">
                      <input
                        id="record_capacity"
                        name="record_capacity"
                        type="text"
                        onChange={handleInputs}
                        autoComplete="off"
                        placeholder="Enter record capacity"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset px-4 text-gray focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-light-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Camera
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="h-screen border-l-2 flex flex-col gap-16">
            {chatbotOpen ? <><Chatbot />
            <div className="w-full flex items-center">
            <button
            onClick={() => setchatbotOpen(false)}
            className="mt-2 px-4 text-center w-2/3 mx-auto py-1  bg-green-700 text-white rounded-md"
          >Close
            
          </button>
          </div>
            </> : <><Description />
            <div className="flex items-center gap-3 mb-20 px-3 rounded-lg py-2 hover:cursor-pointer hover:bg-[#eeeeee]" onClick={()=>setchatbotOpen(true)}>
              <img src="chatbot.png" alt="" className="h-16" />
              <h1 className="font-medium">Have Questions? Here to help!</h1>
            </div>
          </>}
          </div>
        </>
      ) : (
        <h1 className="text-center w-full font-bold hover:text-green-800 hover:cursor-pointer text-green-600 my-5 text-3xl">
          <Link to={"/login"}>Click to log in and Continue</Link>
        </h1>
      )}
    </div>
  );
};

export default AddCameraForm;
