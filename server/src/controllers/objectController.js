const express=require('express');
const pool = require('../config/db');

const getAllVideos=async (req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM videos');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getObjectTimestamp=async (req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

module.exports = { getAllVideos,getObjectTimestamp };