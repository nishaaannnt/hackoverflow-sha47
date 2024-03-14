import { React, createContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Settings from "../pages/Settings";
import Dashboard from "../pages/Dashboard";
import Access from "../pages/Access";
import Activity from "../pages/Activity";
import Home from "../pages/Home";
import NavBar from "../components/Navbar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AddCamera from "../pages/AddCamera";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import About from "../pages/About";


const Router = () => {

  const {setLoggedIn,setUser} = useAuth();
  
  // check if cookie of login is present
  useEffect(()=>{
    async function run (){
      const token=localStorage.getItem('token');
    if(token){
      const res=await axios.get('http://localhost:3001/auth/v2/user/login',{
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
    
      <NavBar />
      <div className="flex h-auto">
        <div className="z-10">
          <Sidebar />
        </div>
        <div className="w-full flex-1">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/access" element={<Access />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/addcamera" element={<AddCamera />} />
            <Route path="/about" element={<About />} />
          </Routes>
            
        </div>
      </div>
    </>
  );
};

export default Router;
