import React, { useEffect, useState } from "react";

const CamNearby = ({ latitude, longitude, radius, camera }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCybfgkpxg0hz7NgoB1MDhc3dVGIYsPw4k&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function initMap() {
    if (window.google && window.google.maps) {
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
          zoom: 10,
        }
      );

      const markerInstance = new window.google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 5    ,
            fillColor: "#ffff08", 
            fillOpacity: 2,
            strokeWeight: 0,
          },
        map: mapInstance,
      });

      
      setMap(mapInstance);
      setMarker(markerInstance);
      markerInstance.addListener("dragend", updateSearch);
      const circleOptions = {
        strokeColor: "#007BFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#007BFF",
        fillOpacity: 0.35,
        map: mapInstance,
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude)},
        radius: radius * 1000, 
      };
      const circleInstance=new window.google.maps.Circle(circleOptions);   
    circleInstance.bindTo('center', markerInstance, 'position');
    }
  }

  camera.map((camera) => {
    const cameraLat = parseFloat(camera.latitude);
    const cameraLng = parseFloat(camera.longitude);

    if (window.google && window.google.maps && map) {
      new window.google.maps.Marker({
        position: { lat: cameraLat, lng: cameraLng },
        map: map,
        title: camera.cameraname,
      });
    }

    return <React.Fragment key={camera.camid} />;
  });

  function updateSearch() {
    const position = marker.getPosition();

    performRadiusSearch(position);
  }

  function performRadiusSearch(center) {
    // Clear previous markers
    clearMarkers();

    // Create a new marker at the center
    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
    });

  }

  return <div id="map" style={{ height: "400px", width: "100%" }} className="my-4"/>;
};

export default CamNearby;
