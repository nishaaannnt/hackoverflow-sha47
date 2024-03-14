import React from 'react';
import { useState } from 'react';

const CameraTable = ({ cameraData }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [searching,setSearching]=useState(false);
  const [filteredCameraData,setFilterData]=useState();

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
    if (keyword.length < 3) {
      setSearching(false);
      setFilterData({});
      return;
    }
    setSearching(true);
    const filteredCameraData = cameraData.filter((camera) =>
      Object.values(camera).some((value) =>
        value.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setFilterData(filteredCameraData);

  }

  return (
    <div className='flex flex-col'>
    <div className='w-full flex items-center justify-between mb-4'>
      <p className='font-bold'>Hello Admin,</p>
      <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearch} className="my-3 px-4 py-2 border border-gray-700 rounded-md"/>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
        <tr className="bg-gray-200">
            <th className="py-3 px-3 border border-gray-400">Camera Name</th>
            <th className="py-3 px-3 border border-gray-400">Latitude</th>
            <th className="py-3 px-3 border border-gray-400">Longitude</th>
            <th className="py-3 px-3 border border-gray-400">Address</th>
            <th className="py-3 px-3 border border-gray-400">Postal Code</th>
            <th className="py-3 px-3 border border-gray-400">Visibility Range</th>
            <th className="py-3 px-3 border border-gray-400">Status</th>
            <th className="py-3 px-3 border border-gray-400">Model</th>
            <th className="py-3 px-3 border border-gray-400">Resolution</th>
            <th className="py-3 px-3 border border-gray-400">Recording Capacity</th>
          </tr>
        </thead>
        <tbody>
          {searching?
          filteredCameraData?.map((camera) => (
            <tr key={camera.camid}>
              <td className="py-2 px-3 border text-center">{camera.cameraname}</td>
              <td className="py-2 px-3 border text-center">{camera.latitude}</td>
              <td className="py-2 px-3 border text-center">{camera.longitude}</td>
              <td className="py-2 px-3 border text-center w-1/4">{camera.camaddress}</td>
              <td className="py-2 px-3 border text-center">{camera.postalcode}</td>
              <td className="py-2 px-3 border text-center">{camera.visibilityrange}</td>
              <td className="py-2 px-3 border text-center">{camera.status}</td>
              <td className="py-2 px-3 border text-center">{camera.model}</td>
              <td className="py-2 px-3 border text-center">{camera.resolution}</td>
              <td className="py-2 px-3 border text-center">{camera.record_capacity}</td>
            </tr>
          ))
          :
          cameraData.map((camera) => (
              <tr key={camera.camid}>
              <td className="py-2 px-3 border text-center">{camera.cameraname}</td>
              <td className="py-2 px-3 border text-center">{camera.latitude}</td>
              <td className="py-2 px-3 border text-center">{camera.longitude}</td>
              <td className="py-2 px-3 border text-center w-1/4">{camera.camaddress}</td>
              <td className="py-2 px-3 border text-center">{camera.postalcode}</td>
              <td className="py-2 px-3 border text-center">{camera.visibilityrange}</td>
              <td className="py-2 px-3 border text-center">{camera.status}</td>
              <td className="py-2 px-3 border text-center">{camera.model}</td>
              <td className="py-2 px-3 border text-center">{camera.resolution}</td>
              <td className="py-2 px-3 border text-center">{camera.record_capacity}</td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>

    </div>
  );
};

export default CameraTable;