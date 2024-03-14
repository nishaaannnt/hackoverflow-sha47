import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CamNearby from "../components/CamNearby";

const NearbyCamera = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [radius, setRadius] = useState();
  const [camera, setCamera] = useState();
  const [viewOnMap, setViewOnMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, isloggedin } = useAuth();
  const [submit, setSubmit] = useState(false);

  const handleLocationSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setViewOnMap(false);

      const response = await axios.post(
        "http://localhost:3001/api/camera/user/nearbycamera",
        {
          userLatitude: latitude,
          userLongitude: longitude,
          searchRadius: radius,
        }
      );

      console.log(response.data);
      setCamera(response.data);
      setSubmit(true);
      setViewOnMap(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-8 my-8">
      {isloggedin ? (
        <div>
          <h1 className="text-xl my-4 mb-8">
            Enter the latitude and longitude for the center and the radius
            around it.
          </h1>
          <form onSubmit={(e) => handleLocationSubmit(e)}>
            <input
              type="text"
              name="latitude"
              placeholder="Enter Latitude"
              onChange={(e) => setLatitude(e.target.value)}
              className="border p-2 m-2 rounded-md"
            />

            <input
              type="text"
              placeholder="Enter Longitude"
              name="longitude"
              onChange={(e) => setLongitude(e.target.value)}
              className="border p-2 m-2 rounded-md"
            />

            <input
              type="text"
              placeholder="Enter radius in KM"
              name="radius"
              onChange={(e) => setRadius(e.target.value)}
              className="border p-2 m-2 rounded-md"
            />

            <button
              type="submit"
              className="bg-green-800 text-white p-2 m-2 rounded"
            >
              Search
            </button>

          </form>
          {submit && !loading && (
            <div>
              <h2 className="text-2xl font-bold my-8">
                Mounted Cameras in {radius}KM radius
              </h2>
              {camera && camera.length > 0 ? (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="border p-2">Camera Name</th>
                      <th className="border p-2">Latitude</th>
                      <th className="border p-2">Longitude</th>
                      <th className="border p-2">Visibility Range</th>
                      <th className="border p-2">Model</th>
                      <th className="border p-2">Resolution</th>
                      <th className="border p-2">Record Capacity</th>
                      <th className="border p-2">Entity Type</th>
                      <th className="border p-2">Camera Address</th>
                      <th className="border p-2">Postal Code</th>
                      <th className="border p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {camera.map((camera) => (
                      <tr key={camera.camid}>
                        <td className="border p-2">{camera.cameraname}</td>
                        <td className="border p-2">{camera.latitude}</td>
                        <td className="border p-2">{camera.longitude}</td>
                        <td className="border p-2">{camera.visibilityrange}</td>
                        <td className="border p-2">{camera.model}</td>
                        <td className="border p-2">{camera.resolution}</td>
                        <td className="border p-2">{camera.record_capacity}</td>
                        <td className="border p-2">{camera.entitytype}</td>
                        <td className="border p-2">{camera.camaddress}</td>
                        <td className="border p-2">{camera.postalcode}</td>
                        <td className="border p-2">{camera.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="my-4">
                  No cameras found in the specified location and radius.
                </p>
              )}
            </div>
          )}
          {viewOnMap && <CamNearby 
            latitude = {latitude}
            longitude = {longitude}
            radius = {radius}
            camera = {camera}
            />}
        </div>
      ) : (
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </div>
  );
};

export default NearbyCamera;
