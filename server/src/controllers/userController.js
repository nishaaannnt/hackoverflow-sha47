const express=require('express');
const pool = require('../config/db');

const getUserById=async (req,res)=>{
    try {
        const userid=req.params.userid;
        const result = await pool.query('SELECT * FROM users WHERE userid=$1',[userid]);
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getAllUsers=async (req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const getUserByCamId=async (req,res)=>{
  try {
      const camid=req.params.camid;
      const result = await pool.query('SELECT userid FROM camera WHERE camid=$1',[camid]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getUserById,getAllUsers,getUserByCamId};