// Maps.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import DetailedInfoSidebar from "../components/DetailedInfoSidebar"; // Import the new sidebar component
import PrivCamAC from "../assets/markers/privcamActive.png";
import PrivCamIN from "../assets/markers/privcamInactive.png";
import PubCamAC from "../assets/markers/pubcamAC.png";
import PubCamIN from "../assets/markers/pubcamIN.png";
import {useAuth} from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Maps() {
  const position = { lat: 18.990363300616675, lng: 73.12767009558458 };
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [users, setUsers] = useState([]);
  const {user,isloggedin}=useAuth();
  const [isDetailedSidebarOpen, setIsDetailedSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3001/api/camera/all"
        );
        setCameras(response.data.map((camera) => ({ ...camera, open: false })));
        console.log(cameras);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (cameraId) => {
    setCameras((prevCameras) =>
      prevCameras.map((camera) => ({
        ...camera,
        open: camera.camid === cameraId ? !camera.open : camera.open,
      }))
    );
    const selected = cameras.find((camera) => camera.camid === cameraId);
    const fetchUserId = async () => {
      try {
        const usersResponse = await axios.get(
          `http://localhost:3001/api/users/cam/${selected.camid}`
        );
        setUsers(usersResponse.data);
        console.log(usersResponse);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
    setSelectedCamera(selected);
    setIsDetailedSidebarOpen(false);
  };

  const handleInfoWindowClose = () => {
    setCameras((prevCameras) =>
      prevCameras.map((camera) => ({ ...camera, open: false }))
    );
    setSelectedCamera(null);
    setIsDetailedSidebarOpen(false);
  };

  const handleDetailedSidebarClose = () => {
    setIsDetailedSidebarOpen(false);
  };
  return (
    <>
    {isloggedin ? (
    <APIProvider apiKey={import.meta.env.VITE_REACT_APP_MAP_API}>
      <div className="h-full w-full flex">
        {loading ? (
          <p>Loading....</p>
        ) : (
          <Map
            zoom={10}
            center={position}
            mapId={import.meta.env.VITE_APP_MAP_ID}
          >
            {cameras.map((camera) => (
              <Marker
                key={camera.camid}
                position={{
                  lat: parseFloat(camera.latitude),
                  lng: parseFloat(camera.longitude),
                }}
                options={{
                  icon:
                    camera.entitytype.toLowerCase() === "private"
                      ? camera.status.toLowerCase() === "active"
                        ? PrivCamAC
                        : PrivCamIN
                      : camera.status.toLowerCase() === "active"
                      ? PubCamAC
                      : PubCamIN,
                }}
                onClick={() => handleMarkerClick(camera.camid)}
              />
            ))}
            {selectedCamera && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedCamera.latitude),
                  lng: parseFloat(selectedCamera.longitude),
                }}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <p>
                    {" "}
                    <span className="font-bold">Camera Location </span>:{" "}
                    {selectedCamera.cameraname}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Status </span>:{" "}
                    {selectedCamera.status}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Model </span>:{" "}
                    {selectedCamera.model}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Resolution </span>:{" "}
                    {selectedCamera.resolution}
                  </p>
                  <p>
                    {" "}
                    <span className="font-bold">Visibility </span>:{" "}
                    {selectedCamera.visibilityrange}
                  </p>
                  <button onClick={() => setIsDetailedSidebarOpen(true)}>
                    {" "}
                    <span className=" flex bg-green-500 rounded-md text-white p-2 mt-4">
                      More
                    </span>
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        )}

        {isDetailedSidebarOpen && selectedCamera && (
          <div className="w-1/4 p-4 bg-white">
            <DetailedInfoSidebar
              camera={selectedCamera}
              users={selectedCamera.userid}
              onClose={handleDetailedSidebarClose}
            />
          </div>
        )}
      </div>
    </APIProvider>
  ): (
    <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16">
      <Link to={"/login"}>Click to Login and continue</Link>
    </p>
  )}
  </>
  )
}
