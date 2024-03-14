const express = require("express");
const pool = require("../config/db");
const jwt =require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = "SELECT * FROM users WHERE email=$1";
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      console.log("galat")
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user=result.rows[0];
    const passwordMatch=await bcrypt.compare(password,user.password);

    if(!passwordMatch){
      console.log("galat")
      return res.status(401).json({ error: "Incorrect Password" });
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
      email,
      password,
      fullname,
      phone,
      locale_address,
      locale_name,
      locale_type,
    } = req.body;

    const hashedPassword=await bcrypt.hash(password,10);

    const query =
      "INSERT INTO users (email,password,fullname,phone,locale_address,locale_name,locale_type) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [
      email,
      hashedPassword,
      fullname,
      phone,
      locale_address,
      locale_name,
      locale_type,
    ];
    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, signup,user };
