import { createContext,useContext,useState } from "react";

const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [isloggedin,setLoggedIn]=useState(false);
    const [user,setUser]=useState();

    return (
        <AuthContext.Provider value={{setLoggedIn,isloggedin,user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
  };