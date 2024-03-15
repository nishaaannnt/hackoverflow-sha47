import { React, createContext, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Maps from "../pages/Maps";
import Settings from "../pages/Settings";
import Analysis from "../pages/Analysis";
import Dashboard from "../pages/Dashboard";
import Activity from "../pages/Activity";
import Home from "../pages/Home";
import NavBar from "../components/Navbar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import NearbyCamera from "../pages/NearbyCamera";
const Router = () => {
  const {setUser, setLoggedIn} = useAuth();
  useEffect(()=>{
    async function run (){
      const token=localStorage.getItem('token');
    if(token){
      const res=await axios.get('http://localhost:3001/auth/v2/police/login',{
        headers:{
          Authorization:token,
        }
      })
      // console.log(res.data.decodeToken.user);
      setLoggedIn(true);
      setUser(res.data.decodeToken.user);
      console.log(res.data.decodeToken.user);
    }else{
      console.log("No token found")
    }
    }
 run()
},[])
  return (
        <>        
        <NavBar/>
    <div className="flex h-auto">
        <div className="z-50">
          <Sidebar />
        </div>
        <div className="w-full flex-1">
      <Routes>
        <Route
          exact path = "/" element = {<Home/>}
        />
        <Route path="/locate" element={<Maps />} />
        <Route path="/analyse" element={<Analysis />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nearby" element={<NearbyCamera />} />
      </Routes>
    </div>
    </div>
    </>
  )
}

export default Router
