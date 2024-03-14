import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const ObjectVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState('');
  const [objectData, setObjectData] = useState([{ object: '', freq: '' }]);
  const [timestamps, setTimestamps] = useState([]);
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/analyze/all');
        console.log(response.data);
        setVideoList(response.data);
      } catch (err) {
        toast.error("Error Fetching the videos")
        console.log(err);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.value);
  };

  const handleObjectNameChange = (event, index) => {
    const newData = [...objectData];
    newData[index].object = event.target.value;
    setObjectData(newData);
  };

  const handleFrequencyChange = (event, index) => {
    const newData = [...objectData];
    newData[index].freq = event.target.value;
    setObjectData(newData);
  };

  const handleAddObject = () => {
    setObjectData([...objectData, { object: '', freq: '' }]);
  };

  const handleRemoveObject = (index) => {
    const newData = [...objectData];
    newData.splice(index, 1);
    setObjectData(newData);
  };

  const handleViewTimestamps = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const rawData = objectData.filter((data) => data.object && data.freq);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(rawData),
        redirect: 'follow',
      };

      const response = await fetch(`http://127.0.0.1:8000/predict/${selectedVideo}`, requestOptions);
      const result = await response.json();

      if (result.results) {
        setTimestamps(result.results);
      } else {
        console.error('No results in the API response');
        toast.error("Error Fetching the object.Try later")
      }
    } catch (error) {
      console.error('Error fetching timestamps:', error);
      toast.error("Error Fetching the object.Try later")
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">ObjectVideos</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Video:</label>
        <select
          className="mt-1 p-2 border rounded-md w-full"
          value={selectedVideo}
          onChange={handleVideoChange}
        >
          <option value="">Select a video</option>
          {videoList
            ? videoList.map((video, index) => (
                <option key={index} value={video.name}>
                  {video.name}
                </option>
              ))
            : <p>--No videos analysed--</p>
          }
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Objects and Timestamps:</label>
        {objectData.map((data, index) => (
          <div key={index} className="flex mb-2">
            <input
              type="text"
              placeholder="Enter Object"
              className="mt-1 p-2 border rounded-md w-1/2 mr-2"
              value={data.object}
              onChange={(event) => handleObjectNameChange(event, index)}
            />
            <input
              type="text"
              placeholder="Enter Frequency"
              className="mt-1 p-2 border rounded-md w-1/2 mr-2"
              value={data.freq}
              onChange={(event) => handleFrequencyChange(event, index)}
            />
            <button
              type="button"
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700"
              onClick={() => handleRemoveObject(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-700"
          onClick={handleAddObject}
        >
          Add Object
        </button>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        onClick={handleViewTimestamps}
      >
        View Timestamps
      </button>

      <div className="mt-4 py-8">
        <hr className='mb-6'/>
        {timestamps.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Timestamps on matching the object and frequency:</h3>
            <ul>
              {timestamps.map((timestamp, index) => (
                <li key={index} className="text-gray-700">
                  {timestamp}
                </li>
              ))}
            </ul>
          </div>
        ):<p className='text-center text-lg font-bold'>No objects with that exact frequency </p>}
      </div>
    </div>
  );
};

export default ObjectVideos;
