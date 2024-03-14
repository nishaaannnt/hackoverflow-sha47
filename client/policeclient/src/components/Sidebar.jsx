import React from "react";
import "../App.css";
import { SidebarData } from "../assets/SidebarData";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const location=useLocation();

  return (
    <div className="flex h-full  shadow-xl ">
      <div
        className={` min-h-[92vh] p-5 pt-8 ${
          open ? "w-[200px]" : "w-[80px]"
        } relative`}
      >
        <ArrowBackIosNewRoundedIcon
          className={`bg-dark-green text-white text-3xl rounded-full absolute -right-3 top-9 border border-dark-green cursor-pointer z-50 transform ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />

        <ul className="pt-2">
          <img src="/drishti1.png" alt="logo" />
          {SidebarData.map((val, key) => {
            return (
              <Link to={val.link} className="hover:text-black">
              <li
              key={key}
              className={` text-dark-green  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#e3fcf7]  rounded-md mt-2 ${location.pathname == val.link ? 'bg-[#e3fcf7]' : ''}`}
              id={window.location.pathname == val.link ? "active" : ""}

            >
             {val.icon}
              {
                open? val.title : ""
              }
              </li>
              </Link>
            );
          })}
        </ul>
      </div>
  </div>
  );
}

export default Sidebar;


