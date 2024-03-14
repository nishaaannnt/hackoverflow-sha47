import { React, createContext, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import { AuthProvider } from "./context/Authcontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      {/* <Appstate.Provider value={{ open, setOpen }}> */}
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition:Bounce
      />
      {/* </Appstate.Provider> */}
    </AuthProvider>
  );
}

export default App;
