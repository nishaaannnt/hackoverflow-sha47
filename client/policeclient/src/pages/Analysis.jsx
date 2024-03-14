import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ObjectVideos from "../components/ObjectVideos";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState(null);
  const [viewExistingVideos, setViewExistingVideos] = useState(false);
  const { user, isloggedin } = useAuth();

  const handleSubmit = async () => {
    setAnalysisStatus("Analyzing...");
    const formData = new FormData();
    formData.append("name", filename);
    console.log(file);
    formData.append("video", file, file.name);

    var requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/process-video/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        toast.success("Analysis Done");
        setAnalysisStatus("Analysis Done");

        setViewExistingVideos(true);
      })
      .catch((error) =>{ console.log("error", error)
      toast.error("Analysis failed try again");
      setAnalysisStatus("Analysis failed. Check the file type or try later")
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleFileNameChange = (event) => {
    setFilename(event.target.value);
    console.log(filename);
  };

  return (
    <>
      {isloggedin ? (
        <div className="px-8 py-8">
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              onClick={() => setViewExistingVideos(false)}
            >
              Add Video for Analysis
            </button>
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              onClick={() => setViewExistingVideos(true)}
            >
              Analyse existing video
            </button>
          </div>
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            {!viewExistingVideos ? (
              <>
                <form
                  className="mt-10 sm:mx-auto w-1/3 border-2 p-8 rounded-xl text-center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <h1 className="mb-4 font-bold">
                    Upload your video for analysis
                  </h1>
                  <div className="w-30 flex flex-col items-center justify-between">
                    <CloudUploadIcon
                      sx={{ width: 200, height: 200 }}
                      className={`text-dark-green`}
                    />
                    <div className="w-full">
                      <div className="mx-auto">
                        <input
                          type="file"
                          id="myFile"
                          className="text-center mb-3"
                          required
                          name="file"
                          onChange={handleFileChange}
                        ></input>
                      </div>
                      <input
                        type="text"
                        name="filename"
                        className="border  rounded-md py-1 px-2 mx-2"
                        required
                        placeholder="Enter file name"
                        onChange={handleFileNameChange}
                      />
                      <button
                        className="bg-dark-green text-white py-1 px-4 rounded-md"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </form>
                <p className="text-center mt-4 text-gray-500">Upload and wait till video is analysed. Then access the objects in "Analyse existing video"</p>
                {analysisStatus && (
                  <div className="mt-4 text-center text-xl font-semibold text-dark-green">
                    {analysisStatus}
                  </div>
                )}
              </>
            ) : (
              <ObjectVideos />
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-green-700 font-bold text-3xl hover:text-green-900 mt-16">
          <Link to={"/login"}>Click to Login and continue</Link>
        </p>
      )}
    </>
  );
};

export default Analysis;
