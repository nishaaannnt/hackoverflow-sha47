// LocationPicker.js

import React, { useEffect, useState } from "react";

const SelectMap = ({ onDataSubmit }) => {
  const manualInput = {
    address: "",
    postalCode: "",
    lat: "",
    lon: "",
  };

  const [loading, setLoading] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [searching,setSearching]=useState(false);

  useEffect(() => {
    function initMap() {
      setLoading(false);

      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 18.990363300616675, lng: 73.12767009558458  },
        zoom: 9,
      });
      const input = document.getElementById("searchInput");
      map.controls.push(input);

      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);

      const infowindow = new window.google.maps.InfoWindow();
      const marker = new window.google.maps.Marker({
        map: map,
        anchorPoint: new window.google.maps.Point(0, -29),
        draggable: true,
      });

      autocomplete.addListener("place_changed", function () {
        setLoading(false);
        setSearching(true);

        const place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        marker.setIcon({
          url: place.icon,
          size: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(35, 35),
        });
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        const address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
          (place.address_components[2] &&
            place.address_components[2].short_name) ||
            "",
        ].join(" ");

        infowindow.setContent(
          "<div><strong>" + place.name + "</strong><br>" + address
        );
        infowindow.open(map, marker);

        for (let i = 0; i < place.address_components.length; i++) {
          if (place.address_components[i].types[0] === "postal_code") {
            document.getElementById("postal_code").innerHTML =
              place.address_components[i].long_name;
          }
        }
        manualInput.address = place.formatted_address;
        manualInput.postalCode =
          document.getElementById("postal_code").innerHTML;
        manualInput.lat = place.geometry.location.lat();
        manualInput.lon = place.geometry.location.lng();
        console.log(manualInput);
        onDataSubmit(manualInput);
        console.log(manualInput);
        console.log(place.formatted_address);
        document.getElementById("location").innerHTML = place.formatted_address;
        document.getElementById("lat").innerHTML =
          place.geometry.location.lat();
        document.getElementById("lon").innerHTML =
          place.geometry.location.lng();
      });

      marker.addListener("dragend", function () {
        const position = marker.getPosition();
        document.getElementById("lat").innerHTML = position.lat();
        document.getElementById("lon").innerHTML = position.lng();

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: position }, function (results, status) {
          if (status === "OK" && results[0]) {
            const place = results[0];

            document.getElementById("location").innerHTML =
              place.formatted_address;

            for (let i = 0; i < place.address_components.length; i++) {
              if (place.address_components[i].types[0] === "postal_code") {
                document.getElementById("postal_code").innerHTML =
                  place.address_components[i].long_name;
              }
              // if (place.address_components[i].types[0] === "country") {
              //   document.getElementById("country").innerHTML =
              //     place.address_components[i].long_name;
              // }
            }
            infowindow.setContent(
              "<div><strong>" +
                (place.formatted_address || place.name) +
                "</strong><br>" +
                "</div>"
            );
            manualInput.address = place.formatted_address;
            manualInput.postalCode =
              document.getElementById("postal_code").innerHTML;
            manualInput.lat = place.geometry.location.lat();
            manualInput.lon = place.geometry.location.lng();
            console.log(manualInput);
            onDataSubmit(manualInput);
            infowindow.open(map, marker);
          }
        });
      });
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCybfgkpxg0hz7NgoB1MDhc3dVGIYsPw4k&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [manualMode]);

  return (
    <div className="flex flex-col">
      {loading && <p>Loading...</p>}
      <div
        id="map"
        className={`h-[300px] w-80% ${loading ? "hidden" : ""}`}
      ></div>
      <p className="text-center">
        Enter location name and drag marker if not accurate
      </p>

      <div  className={`my-4 ${!searching ? 'hidden' : ''}`}>
        <ul className="py-4 gap-3 flex flex-col">
          <li className="font-bold text-xl">
            Full Address: <span className="font-normal" id="location"></span>
          </li>
          <li className="font-bold text-xl">
            Postal Code: <span className="font-normal" id="postal_code"></span>
          </li>
          <li className="font-bold text-xl">
            Latitude: <span className="font-normal" id="lat"></span>
          </li>
          <li className="font-bold text-xl">
            Longitude: <span className="font-normal" id="lon"></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SelectMap;
