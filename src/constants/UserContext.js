import React, {createContext, useEffect, useState} from "react";

export const UserContext = createContext({});

export const UserProvider= (props)=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [rol, setRol] = useState(JSON.parse(localStorage.getItem("rol"))||{});
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")) || {});
    const setUserAndLocal = (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
    const setRoleAndLocal = (rol) => {
       localStorage.setItem("rol", JSON.stringify(rol));
       setRol(rol)
    }
    const setTokenAndLocal = (token) => {
       localStorage.setItem("token", JSON.stringify(token));
       setToken(token)
    }
  
    return(
      <UserContext.Provider 
        value={{
            user,
            setUser:setUserAndLocal,
            rol, 
            setRol:setRoleAndLocal,
            token,
            setToken:setTokenAndLocal,
        }}>
        {
          props.children
        }
      </UserContext.Provider>
    )
  
  }