const express = require("express");
const pool = require("../config/db");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");

const dotenv=require('dotenv');
dotenv.config();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT * FROM POLICE WHERE username=$1";
    const values = [username];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user=result.rows[0];
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(!passwordMatch){
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { user: result.rows[0]},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie('token', token);
    res.status(200).json({user:result.rows[0],token});
  } catch (err) {
    console.error("Error fetching details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const user = async(req,res)=>{
  const token=req.headers.authorization;
  if(token){
    try {
        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({decodeToken});
    } catch (error) {
      res.status(403).json({message:"Invalid Credentials"})
    }
  }else{
    res.status(403).json({message:"No token"})
  }
}

const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      fullname,
      phone,
      station_address,
      station_name,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);
    const query =
      "INSERT INTO police (username,email,password,fullname,phone,station_address,station_name) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [
      username,
      email,
      hashedPassword,
      fullname,
      phone,
      station_address,
      station_name,
    ];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error("Error during Signup ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signup,user };
