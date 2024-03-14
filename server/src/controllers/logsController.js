const express=require('express');
const pool = require('../config/db');

const postLogs=async (req,res)=>{
    try {
        const { camid, timestamp, message,userid} = req.body;
    
        const result = await pool.query(
          'INSERT INTO logs (camid, timestamp, message,userid) VALUES ($1, $2, $3,$4) RETURNING *',
          [camid, timestamp, message,userid]
        );
    
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Error posting log:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getAllLogs=async(req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM logs');
        res.json(result.rows);
      } catch (error) {
        console.error('Error getting logs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getLogsByUser=async(req,res)=>{
  try {
    const userid = req.params.userid;
      const result = await pool.query('SELECT * FROM logs where userid=$1',[userid]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting logs:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports={getAllLogs,postLogs,getLogsByUser};