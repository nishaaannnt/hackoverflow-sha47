import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function Maps() {
  const position = { lat: 18.990363300616675, lng: 73.12767009558458 };
  // const location = { };
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(false);

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
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_REACT_APP_MAP_API}>
      <div className="h-full w-full">
        {loading ? (
          <p>Loading....</p>
        ) : (
          <Map
            zoom={15}
            center={position}
            mapId={import.meta.env.VITE_APP_MAP_ID}
          >
            {cameras.map((camera) => (
              <AdvancedMarker
                key={camera.camid}
                position={{
                  lat: parseFloat(camera.latitude),
                  lng: parseFloat(camera.longitude),
                }}
                onClick={() => handleMarkerClick(camera.camid)}
              >
                <Pin />
                                {camera.open && (
                  <InfoWindow position={{
                    lat: parseFloat(camera.latitude),
                    lng: parseFloat(camera.longitude),
                  }}>
                    <p>{camera.status}</p>
                  </InfoWindow>
                )}
              </AdvancedMarker>
            ))}
          </Map>
        )}
      </div>
    </APIProvider>
  );
}
