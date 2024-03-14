import { React, createContext, useState } from "react";
import "./App.css";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";


const Appstate = createContext();
function App() {
  const [open, setOpen] = useState();
  return (
    <AuthProvider>
      <Router/>
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
    </AuthProvider>
  );
}

export default App;
