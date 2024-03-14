const express = require("express");
const pool = require("../config/db");
const cameraInRadius = require("../helpers/cameraInRadius");

const getAllCameras = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM camera");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cameras:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCameraById = async (req, res) => {
  try {
    const userid = req.params.userid;
    const result = await pool.query("SELECT * FROM camera WHERE userid=$1", [
      userid,
    ]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching cameras:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postCameraById = async (req, res) => {
  try {
    // const userId=req.params.userid;
    const {
      cameraname,
      userId,
      latitude,
      longitude,
      address,
      postalCode,
      visibilityrange,
      status,
      model,
      resolution,
      record_capacity,
    } = req.body;
    // res.send(req.body);
    const query = `INSERT INTO camera (cameraname,userid,latitude,longitude,visibilityRange,status,model,resolution,camaddress,postalcode,record_capacity, entitytype) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'private') RETURNING *`;
    const values = [
      cameraname,
      userId,
      latitude,
      longitude,
      visibilityrange,
      status,
      model,
      resolution,
      address,
      postalCode,
      record_capacity,
    ];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCameraById = async (req, res) => {
  try {
    const cameraId = req.params.cameraid;
    const {
      cameraname,
      latitude,
      longitude,
      visibilityrange,
      status,
      model,
      resolution,
      record_capacity,
    } = req.body;

    const query = `
      UPDATE camera
      SET cameraname = $1,
          latitude = $2,
          longitude = $3,
          visibilityRange = $4,
          status = $5,
          model = $6,
          resolution = $7,
          record_capacity = $8
      WHERE camid = $9
      RETURNING *`;

    const values = [
      cameraname,
      latitude,
      longitude,
      visibilityrange,
      status,
      model,
      resolution,
      record_capacity,
      cameraId,
    ];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Camera not found" });
    }
  } catch (error) {
    console.error("Error updating camera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCameraById = async (req, res) => {
  try {
    const cameraId = req.params.cameraid;

    const query = `
      DELETE FROM camera
      WHERE camid = $1
      RETURNING *`;

    const values = [cameraId];

    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.json({ message: "Camera deleted successfully" });
    } else {
      res.status(404).json({ error: "Camera not found" });
    }
  } catch (error) {
    console.error("Error deleting camera:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNearbyCameras = async (req, res) => {
  try {
    const { userLatitude, userLongitude, searchRadius } = req.body;
    console.log(userLatitude,userLongitude)
    const query = "SELECT * from camera";
    const results = await pool.query(query);
    const cameras = results.rows;
    console.log(cameras);

    const camerasWithinRadius = cameras.filter(
      (camera) =>
        cameraInRadius.haversine(
          userLatitude,
          userLongitude,
          camera.latitude,
          camera.longitude
        ) <= searchRadius
    );

    res.json(camerasWithinRadius);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getAllCameras,
  getCameraById,
  postCameraById,
  updateCameraById,
  deleteCameraById,
  getNearbyCameras
};
