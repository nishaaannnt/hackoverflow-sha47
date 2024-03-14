import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/Authcontext";
import {toast} from 'react-toastify';

const CameraTable = ({ camera,userId }) => {
  const { user, isloggedin } = useAuth();
  const [cameraData, setUpdatedCameraData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cameraToDelete, setCameraToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching,setSearching]=useState(false);
  const [filteredCameraData,setFilterData]=useState();

  useEffect(() => {
    setUpdatedCameraData(camera);
    console.log(camera);
  }, [camera]);

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


  const handleDeleteClick = (cameraId) => {
    setCameraToDelete(cameraId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/camera/camera/${cameraToDelete}`);
      toast.success("Deleted Camera Successfully")
      const response = await axios.get(`http://localhost:3001/api/camera/user/${userId}/camera`);
      setUpdatedCameraData(response.data);
      const logsData={
        camid:cameraToDelete,
        timestamp: new Date().toISOString(),
        message:"Deleted a Camera ",
        userid:user?.userid
      }
      try{
        const logs=await axios.post(`http://localhost:3001/api/logs/`,logsData);
        console.log(logs);
        }catch(err){
          console.log(err);
          toast.error("Error Entering logs");
        }
    } catch (error) {
      console.error('Error deleting camera:', error);
    } finally {
      setDeleteModalOpen(false);
      setCameraToDelete(null);
    }
  };

  const handleDeleteCancelled = () => {
    setDeleteModalOpen(false);
    setCameraToDelete(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className='w-full flex items-center gap-6 mb-4'>
        <p className='text-gray-700 font-medium text-md'>Search in your cameras</p>
      <input type="text" placeholder='Search' value={searchQuery} onChange={handleSearch} className="my-3 px-4 py-2 border border-gray-700 rounded-md"/>
    </div>
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
            <th className="py-3 px-3 border border-gray-400">Actions</th> {/* New column for actions */}
          </tr>
          
        </thead>
        <tbody>
        {searching?(filteredCameraData.length>0 ? filteredCameraData.map((camera) => (
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
              <button
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDeleteClick(camera.camid)}
                >
                  Delete
                </button>
            </tr>
          )):(<p className='text-center font-bold py-4 text-gray-600'>No cameras Found</p>))
          :
          cameraData.map((camera) => (
            <tr>
            <td className="py-2 px-3 border text-center">{camera.cameraname}</td>
              <td className="py-2 px-3 border text-center">{camera.latitude}</td>
              <td className="py-2 px-3 border text-center">{camera.longitude}</td>
              <td className="py-2  border text-center">{camera.camaddress}</td>
              <td className="py-2 px-3 border text-center">{camera.postalcode}</td>
              <td className="py-2 px-3 border text-center">{camera.visibilityrange}</td>
              <td className="py-2 px-3 border text-center">{camera.status}</td>
              <td className="py-2 px-3 border text-center">{camera.model}</td>
              <td className="py-2 px-3 border text-center">{camera.resolution}</td>
              <td className="py-2 px-3 border text-center">{camera.record_capacity}</td>
              <td className='text-center'><button
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                  onClick={() => handleDeleteClick(camera.camid)}
                >
                  Delete
                </button>
                </td>
            </tr>
          ))
        }
        </tbody>
      </table>

      {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <p className="text-lg font-semibold mb-4">Confirm Delete</p>
            <p className="mb-4">Are you sure you want to delete this camera?</p>
            <div className="flex justify-end">
              <button
                className="mr-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={handleDeleteConfirmed}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                onClick={handleDeleteCancelled}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraTable;
